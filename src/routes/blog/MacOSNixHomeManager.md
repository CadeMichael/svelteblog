---
title: Nix as a package manager for Mac Os and Debian Systems
date: '11-16-24'
---

# Why Nix on Non Nixos Systems?

- Nix gives you *declarative package management* ie you can declare what packages you want on your system and know exactly what is being installed and at what version.
- this pairs perfectly with a workflow that involves several machines
    - for me this is my MacOs laptop for working on campus and my Linux desktop for working at home. Having the same version of the same packages on each simplifies development, especially when dealing with niche software.
- nix on other distros works if you want to try out declarative package management without jumping in with both feet. You are able to get a taste for the nix ecosystem without welding yourself to it, and if you are on a stable debian system you have the benefits of long term stability.

## Resources

- some good websites with documentation for the determinate nix installer, home manager, and nix usage in general
    - [home-manager docs](https://nix-community.github.io/home-manager/)
    - [determinate systems](https://github.com/DeterminateSystems/nix-installer)
    - [zero to nix](https://zero-to-nix.com/)
    - [home-manager wiki](https://nixos.wiki/wiki/Home_Manager)

# Installation

## Nix

- using the determinate systems nix installer
    - built with rust
    - allows flakes by default

```bash
curl --proto '=https' --tlsv1.2 -sSf -L https://install.determinate.systems/nix | \
  sh -s -- install
```

## Channels

- using channels which is essentially the repo with all nix packages that get used to install packages on your system 

```sh
# unstable / master
nix-channel --add https://nixos.org/channels/nixos-unstable
```

## Home Manager

- Installation of home-manager
    - installing via channels

```sh
# when using 'unstable' channel
nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager

nix-channel --update
```

- Useful commands
    - for installing
    - updating
    - cleaning out cached files no longer in use

```sh
# add a new nix channel
nix-channel --add some-channel

# update channels (must be run after adding a new channel)
nix-channel --update

# remove old nix versions -d deletes all old versions
nix-college-garbage -d

# build and switch to new home-manager generation
home-manager switch

# some handy alias
alias hms='home-manager switch'
alias hmd='home-manager switch && nix-collect-garbage -d'
```

# Setting up Home manager

- your home manager config lives in `$HOME/.config/home-manager/home.nix`
    - it is where you declare profile specific packages and configurations

## Using programs with graphics acceleration

- to use these packages you might need to 'wrap' them in a package that detects what GPU's are available on your system
- for this I am using `nixgl` which determines which GPU framework to use and wraps your desired package with it, ensuring that it will run properly on your system.

## MacOS

- on MacOs I was having issues with zsh_history so I decided to set it manually.
    - You can use home manager to manage your dotfiles but I prefer **gnu stow**, it is a bit more simple and works accross machines without nix and home manager
    - I **do not** use nix for GUI applications. This might be a skill issue but you need a script to let *Spotlight* know where apps are to open them and I prefer *Homebrew* for GUI applications.

```nix
{ config, pkgs, ... }:

# when you need an older package
# let
# pkgStable = import <stable> { };
# in
{
  # User information
  home.username = "cade";
  home.homeDirectory = "/Users/cade";

  # Compatible Home Manager release
  home.stateVersion = "24.05";

  # Allow home manager to configure fonts
  fonts.fontconfig.enable = true;
  # Installed packages
  home.packages = [
    # Terminal
    pkgs.bat
    pkgs.coreutils
    pkgs.eza
    pkgs.fh
    pkgs.fzf
    pkgs.gawk
    pkgs.htop
    pkgs.imagemagick
    pkgs.lazygit
    pkgs.pfetch
    pkgs.qrencode
    pkgs.ripgrep
    pkgs.starship
    pkgs.tree-sitter
    pkgs.yazi
    pkgs.zellij
    pkgs.zoxide

    # Fonts (Nerd fonts is now in unstable)
    pkgs.nerd-fonts.hack
    pkgs.nerd-fonts.blex-mono
    # Editor
    pkgs.neovim

    # Verification
    pkgs.souffle

    # Languages
    # -> lua
    pkgs.luajit
    pkgs.lua-language-server
    # -> go
    pkgs.go
    pkgs.gopls
    # -> haskell
    pkgs.ghc
    pkgs.cabal-install
    pkgs.stack
    # -> nix
    pkgs.nixd
    pkgs.nixfmt-rfc-style
    # -> python
    pkgs.uv
  ];

  # ~/.nix-profile/etc/profile.d/hm-session-vars.sh
  home.sessionVariables = {
    EDITOR = "nvim";
    HISTFILE = "$HOME/.zsh_history";
    HISTSIZE = 1000;
    SAVEHIST = 1000;
  };

  # Let Home Manager install and manage itself.
  programs.home-manager.enable = true;
}
```

## PopOS

- my 'generic linux' home manager config mirrors my MacOs one with one important change
    - `targets.genericLinux.enable = true;`
    - this allows for a more 'native' integration of nix packages into your non nixos linux distribution

```nix
{ config, pkgs, ... }:

{
  # Home Manager general setup
  home.username = "cade";
  home.homeDirectory = "/home/cade";
  targets.genericLinux.enable = true;
  fonts.fontconfig.enable = true;

  # Home manager version at install time
  home.stateVersion = "24.05"; # Please read the comment before changing.

  nixGL.packages = import <nixgl> { inherit pkgs; };

  home.packages = [
    # Terminal
    pkgs.bat
    pkgs.fzf
    pkgs.lazygit
    pkgs.ripgrep
    pkgs.tmux
    pkgs.tree
    pkgs.zoxide

    # GUI Applications
    (config.lib.nixGL.wrap pkgs.rio)

    # Languages
    # -> lua
    pkgs.lua-language-server

    # Fonts
    (pkgs.nerdfonts.override { fonts = [ "CascadiaCode" ]; })
    # !!! nerd fonts are in the unstable nix channel as 'pkgs.nerd-fonts.<font name>'
  ];


  # Home Manager can also manage your environment variables through
  # 'home.sessionVariables'. These will be explicitly sourced when using a
  # shell provided by Home Manager. If you don't want to manage your shell
  # through Home Manager then you have to manually source 'hm-session-vars.sh'
  # located at either
  #
  #  ~/.nix-profile/etc/profile.d/hm-session-vars.sh
  #
  # or
  #
  #  ~/.local/state/nix/profiles/profile/etc/profile.d/hm-session-vars.sh
  #
  # or
  #
  #  /etc/profiles/per-user/cade/etc/profile.d/hm-session-vars.sh
  #

  # Let Home Manager install and manage itself.
  programs.home-manager.enable = true;
}
```

# Reflections

- It took some time to dive into nix and home-manager but I believe that it was worth it.
- For school I am using a good deal of niche packages and nix has helped me ease the installation of them across mac and debian (based systems). I love debian but every time I have to use some niche research software I don't want to build it from source and nix helps with this. 
- I prefer having something stable and using nix on top of it as an added benefit. It is like the Blade of Nixos, none of it's weaknesses all of its strengths.
- Additionally learning more about nix and the nix ecosystem led me to use flakes, not for configuration, but for developing with beta software such as Lean4 (they said it's beta software not me I ❤️ Lean4) and it allowed me to work on projects across machines without worrying about versioning conflicts.
