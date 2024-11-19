{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  buildInputs = [
    pkgs.deno
    pkgs.pre-commit
  ];

  packages = [
    (pkgs.python3.withPackages (python-pkgs: with python-pkgs; [
      # select Python packages here

    ]))
  ];

  # Set up Deno and Python environment
  shellHook = ''
    # Set up Deno environment with SilverBullet
    export DENO_INSTALL_ROOT="./.deno"
    mkdir -p ./.deno
    deno install -f --name silverbullet --unstable-kv --unstable-worker-options -A https://get.silverbullet.md --global
    export PATH="$DENO_INSTALL_ROOT/bin:$PATH"
  '';
}
