//! Profile and config management for `meteroid-console`.
//!
//! Profiles live in `$XDG_CONFIG_HOME/meteroid-console/profiles.toml`
//! (fallback: `~/.config/meteroid-console/profiles.toml`).

use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;
use std::io::Write;
use std::path::PathBuf;

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct ProfilesFile {
    pub active: Option<String>,
    pub profiles: BTreeMap<String, Profile>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Profile {
    pub url: String,
    pub api_key: Option<String>,
    #[serde(default = "default_profile_kind")]
    pub kind: ProfileKind,
}

#[derive(Debug, Clone, Copy, Default, Serialize, Deserialize, PartialEq, Eq)]
pub enum ProfileKind {
    #[default]
    #[serde(rename = "direct")]
    Direct,
    #[serde(rename = "sidecar")]
    Sidecar,
}

impl ProfileKind {
    pub fn as_str(self) -> &'static str {
        match self {
            ProfileKind::Direct => "direct",
            ProfileKind::Sidecar => "sidecar",
        }
    }
}

fn default_profile_kind() -> ProfileKind {
    ProfileKind::Direct
}

impl ProfilesFile {
    pub fn load() -> Result<Self, Box<dyn std::error::Error>> {
        let path = config_path();
        if !path.exists() {
            return Ok(ProfilesFile::default());
        }
        let text = std::fs::read_to_string(&path)?;
        let profiles: ProfilesFile = toml::from_str(&text)?;
        Ok(profiles)
    }

    pub fn save(&self) -> Result<(), Box<dyn std::error::Error>> {
        let path = config_path();
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent)?;
        }
        let mut file = std::fs::File::create(&path)?;
        file.write_all(toml::to_string_pretty(self)?.as_bytes())?;
        Ok(())
    }

    pub fn get(&self, name: &str) -> Option<&Profile> {
        self.profiles.get(name)
    }

    pub fn set_active(&mut self, name: &str) {
        if self.profiles.contains_key(name) {
            self.active = Some(name.to_string());
        }
    }

    pub fn upsert(&mut self, name: String, profile: Profile) {
        self.profiles.insert(name, profile);
    }

    pub fn remove(&mut self, name: &str) -> bool {
        let existed = self.profiles.remove(name).is_some();
        if self.active.as_deref() == Some(name) {
            self.active = self.profiles.keys().next().cloned();
        }
        existed
    }

    pub fn active_profile(&self) -> Option<(&String, &Profile)> {
        let name = self.active.as_ref()?;
        self.profiles.get(name).map(|p| (name, p))
    }
}

pub fn config_path() -> PathBuf {
    let base = dirs::config_dir()
        .or_else(dirs::home_dir)
        .unwrap_or_else(|| PathBuf::from("."));
    base.join("meteroid-console").join("profiles.toml")
}

/// Run an interactive setup wizard and return the saved profile name.
pub fn setup_wizard() -> Result<Option<String>, Box<dyn std::error::Error>> {
    let mut profiles = ProfilesFile::load()?;

    println!("Meteroid Console Setup Wizard");
    println!("-----------------------------");

    println!("Profile name [default]: ");
    let name = read_line_trim();
    let name = if name.is_empty() {
        "default".into()
    } else {
        name
    };

    println!("URL (e.g. http://10.7.47.106:3000/): ");
    let url = read_line_trim();
    if url.is_empty() {
        println!("Aborted: URL is required.");
        return Ok(None);
    }

    println!("Connection kind [direct/sidecar] (default: direct): ");
    let kind = match read_line_trim().to_lowercase().as_str() {
        "sidecar" => ProfileKind::Sidecar,
        _ => ProfileKind::Direct,
    };

    println!("API key (leave empty for sidecar or unauthenticated direct access): ");
    let api_key_input = read_line_trim();
    let api_key = if api_key_input.is_empty() {
        None
    } else {
        Some(api_key_input)
    };

    let profile = Profile { url, api_key, kind };
    profiles.upsert(name.clone(), profile);
    profiles.set_active(&name);
    profiles.save()?;

    println!("Saved profile '{}' and set it active.", name);
    Ok(Some(name))
}

/// Delete a profile by name; if name is None, show a list and prompt.
pub fn delete_profile(name: Option<&str>) -> Result<bool, Box<dyn std::error::Error>> {
    let mut profiles = ProfilesFile::load()?;

    let name = match name {
        Some(n) => n.to_string(),
        None => {
            if profiles.profiles.is_empty() {
                println!("No profiles to delete.");
                return Ok(false);
            }
            println!("Profiles:");
            for (i, name) in profiles.profiles.keys().enumerate() {
                println!("  {}: {}", i + 1, name);
            }
            println!("Profile name to delete: ");
            let input = read_line_trim();
            if input.is_empty() {
                println!("Aborted.");
                return Ok(false);
            }
            input
        }
    };

    if profiles.remove(&name) {
        profiles.save()?;
        println!("Deleted profile '{}'.", name);
        Ok(true)
    } else {
        println!("Profile '{}' not found.", name);
        Ok(false)
    }
}

/// List profiles.
pub fn list_profiles() -> Result<(), Box<dyn std::error::Error>> {
    let profiles = ProfilesFile::load()?;
    if profiles.profiles.is_empty() {
        println!("No profiles. Run `meteroid-console setup` to create one.");
        return Ok(());
    }
    println!(
        "Profiles (active: {}):",
        profiles.active.as_deref().unwrap_or("none")
    );
    for (name, profile) in &profiles.profiles {
        let active = if profiles.active.as_deref() == Some(name.as_str()) {
            " *"
        } else {
            ""
        };
        println!(
            "  {}{}: {} [{}] key={}",
            name,
            active,
            profile.url,
            profile.kind.as_str(),
            profile.api_key.as_deref().unwrap_or("(none)")
        );
    }
    Ok(())
}

fn read_line_trim() -> String {
    let mut buf = String::new();
    let _ = std::io::stdin().read_line(&mut buf);
    buf.trim().to_string()
}
