---
title: Emacs config, returning into the void
date: '07-04-24'
---

# Returning to Emacs

## Must Haves

to get roped back into emacs I my two goals are **minimalism** and what I would consider a bare minimum set of features.

1. lsp *(eglot)*
    - need lsp to be productive
2. pacakge management *(straight.el)*
    - not cloning packages or using a gui
3. completion *(vertico / consult)*
    - command and file searching completion
4. project searching *(consult)*
    - need to quickly search files, not just '/' and search in buffer
5. treesitter *(treesit*)
    - better syntax highlighting
	- *folding*
6. vim bindings *(evil)*
    - can't do anything else now
7. the distinguishing emacs feature **Repl support**
    - no one has better repl interopt with interpreted languages than emacs
8. Running code without leaving editor (editing buffer) *(quickrun)*

I have a few other packages installed but the main goal of all of them is to satisfy that list.

## Installation

### MacOs

```sh
$ brew tap d12frosted/emacs-plus
$ brew install emacs-plus --with-native-comp
```

### Linux

- using Nix or building from source.

## File layout

- in your `~/.config/emacs/` directory
  - `init.el`
  - `early-init.el`
  - `config.el`

## Essential Packages

- straight
- use-package
- evil 
  - evil-collection
  - undo-fu
- vertico
- orderless
- company
- which-key
  - marginalia
- quickrun
- treesit-fold

## Straight.el

```elisp
;; ~/.config/emacs/init.el
(defvar bootstrap-version)
(let ((bootstrap-file
       (expand-file-name
        "straight/repos/straight.el/bootstrap.el"
        (or (bound-and-true-p straight-base-dir)
            user-emacs-directory)))
      (bootstrap-version 7))
  (unless (file-exists-p bootstrap-file)
    (with-current-buffer
        (url-retrieve-synchronously
         "https://raw.githubusercontent.com/radian-software/straight.el/develop/install.el"
         'silent 'inhibit-cookies)
      (goto-char (point-max))
      (eval-print-last-sexp)))
  (load bootstrap-file nil 'nomessage))

;; ~/.config/emacs/early-init.el
(setq package-enable-at-startup nil)
```

## Emacs Configuration

```elisp
(use-package emacs
  :straight nil
  :preface
  (defun load-config-file (file)
    "Load files in the config dir."
    (load (expand-file-name file my-config-dir)))
  (defun reload-emacs-config ()
    "Reload config.el emacs configuration."
    (interactive)
    (load (expand-file-name "config.el" my-config-dir)))
  (defun open-config-file ()
    "Open this file ie 'config.el'."
    (interactive)
    (find-file (expand-file-name "config.el" my-config-dir)))
  :config
  ;; System
  (setq warning-minimul-level :error)   ; only warn on errors
  (setq                                 ; no warnings
   native-comp-async-report-warnings-errors nil)
  (setq ring-bell-function 'ignore)     ; no bell noise
  (setq make-backup-files nil)          ; no temp files
  (setq read-extended-command-predicate ; only show 'M-x' commands relevant to mode
	#'command-completion-default-include-p)
  (setq enable-recursive-minibuffers t) ; allow opening minibufs in minibufs
  (setopt use-short-answers t)		; y or n

  ;; Theme
  (if (eq system-type 'darwin)          ; set font based on OS
      (add-to-list 'default-frame-alist
		   '(font . "Hack Nerd Font 16"))
    (add-to-list 'default-frame-alist
		 '(font . "Blex Mono Nerd Font 18")))
  (setq inhibit-startup-message t)      ; no splash screen
  (menu-bar-mode -1)                    ; no menu bar
  (tool-bar-mode -1)                    ; no tool bar
  (scroll-bar-mode -1)                  ; no scroll bar
  (global-visual-line-mode)		; better line wrapping

  ;; Org mode / notes
  (require 'org-tempo)                  ; org snippets
  (setq org-startup-indented t)         ; indent org mode
  (setq                                 ; no indent in src blocks
   org-edit-src-content-indentation 0)
  (setq org-src-preserve-indentation t) ; fix src block indents
  (setq org-src-tab-acts-natively t)    ; allow indenting in src blocks
  (org-babel-do-load-languages          ; load babel languages
   'org-babel-load-languages
   '((python . t)))

  :hook
  ;; Programming mode hooks
  (prog-mode . display-line-numbers-mode)
  (prog-mode . hl-line-mode)
  ;; Folding for non ts-modes
  (emacs-lisp-mode . hs-minor-mode)
  (c++-mode . hs-minor-mode))
```

## Use-package setup and integration with straight

```elisp
;; Package management and setup with use-package
(straight-use-package 'use-package)

;; Make straight the default
(use-package straight
  :custom
  (straight-use-package-by-default t)
  (straight-cache-autoloads t))
```

## Evil mode and associated packages

```elisp
;; Undo for evil mode
(use-package undo-fu)

;; Evil mode
(use-package evil
  :init
  (setq evil-want-keybinding nil)  ; needed for evil-collection
  (setq evil-want-C-u-scroll t)    ; allow scroll up with 'C-u'
  (setq evil-want-C-d-scroll t)    ; allow scroll down with 'C-d'
  (setq evil-undo-system 'undo-fu) ; undo system for 'C-r'
  :config
  (evil-mode 1))

;; Path management to keep env variable consistent
(use-package exec-path-from-shell
  :config
  (exec-path-from-shell-initialize))

;; Evil collections for keybindings accross modes
(use-package evil-collection
  :after evil
  :config
  (evil-collection-init))
```

## Completion ui and project searching

```elisp
;; Orderless to get better completions
(use-package orderless
  :custom
  (completion-styles
   '(basic partial-completion orderless))) ; orderless needs to be last

;; Vertico for completion UI
(use-package vertico
  :init
  (vertico-mode))

;; Company mode for text completion popup
(use-package company
  :config
  (global-company-mode t))

;; Consult for searching, grepping, and project exploration
(use-package consult)
(use-package consult-flycheck)

;; Get detailed popup descriptions
(use-package marginalia
  :init
  (marginalia-mode))

;; Keybindings packages and settings

;; Which key, in emacs 30 it will just be a "(require 'which-key)"
(use-package which-key
  :config
  (which-key-mode))
```

## Global keybindings

```elisp
(use-package general
  :after magit
  :config
  (general-evil-setup)
  ;; global keybindings
  (general-create-definer global/leader-keys
    :states '(normal insert visual emacs)
    :keymaps 'override
    :prefix "SPC"
    :global-prefix "C-SPC")
  (global/leader-keys
    ;; SPC +
    "r r" '(reload-emacs-config :wk "reload config")
    "b s" '(consult-buffer :wk "consult buffer")
    "b k" '(kill-buffer-and-window :wk "kill buffer and window")
    "o c" '(open-config-file :wk "open config file")
    ;; use "--" to pass options to `ripgrep'
    "f r" '(consult-ripgrep :wk "consult ripgrep")
    "f f" '(consult-find :wk "consult find")
    "p s" '(project-switch-project :wk "project switch")
    "p k" '(project-kill-buffers :wk "project kill buffers")
    "p F" '(project-forget-project :wk "project forget")
    "p R" '(project-remember-projects-under :wk "project remember projects under")
    "p !" '(project-shell-command :wk "project shell command")
    "p &" '(project-async-shell-command :wk "project async shell command")
    "c c" '(quickrun :wk "quickrun")
    "c a" '(quickrun-with-arg :wk "quickrun with arg")
    "E" '(consult-flymake :wk "consult flymake")
    "m" '(consult-imenu :wk "consult imenu")
    "g" '(magit :wk "magit")
    "/" '(consult-line :wk "consult find line")
    "." '(find-file :wk "find file")
    ":" '(execute-extended-command :wk "execute extended command") ; M-x
    "!" '(shell-command :wk "shell command")
    "&" '(async-shell-command :wk "async shell command")))
```

## Version control (git) tooling

```elisp
;; Version control management
(use-package magit)

;; Show where changes are in a vc tracked file
(use-package git-gutter
  :init
  (global-git-gutter-mode +1)
  :config
  (general-nmap 'override
    "[g" 'git-gutter:previous-hunk
    "]g" 'git-gutter:next-hunk))
```

## Language tooling

```elisp
;; Running code more dynamically
(use-package quickrun)

;; Project configurations
(use-package project
  :straight nil
  :preface
  ;; find cmake projects
  (defun project-find-cmake (dir)
    (when-let ((root (locate-dominating-file dir "CMakeLists.txt")))
      (cons 'cmake-lists root)))
  (cl-defmethod project-root ((project (head cmake-lists)))
    (cdr project))
  :config
  (add-hook 'project-find-functions 'project-find-cmake))

;; Eglot with limited mini buffer madness
(use-package eglot
  :straight nil
  :custom
  (eldoc-echo-area-use-multiline-p nil))

;; Treesitter for syntax
(use-package treesit
  :straight nil
  :config
  (setq treesit-font-lock-level 4) ; maximum highlighting
  (setq major-mode-remap-alist
	'((python-mode . python-ts-mode)
	  (c-mode . c-ts-mode))))

;; Folding for `treesit' supported languages
(use-package treesit-fold
  :straight
  (treesit-fold :type git :host github :repo "emacs-tree-sitter/treesit-fold")
  :init
  (global-treesit-fold-mode))
```

## Rust specific tooling

```elisp
(use-package rust-mode
  :init
  (setq rust-mode-form t)
  (setq rust-mode-treesitter-derive t))
```
