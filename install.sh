#!/bin/sh
clear
echo "Copy pre-commit hook"
cp pre-commit .git/hooks/
echo "Ensure pre-commit hook is executable"
chmod +x .git/hooks/pre-commit
echo "Run grunt build task"
grunt build
clear
echo "Installation complete"