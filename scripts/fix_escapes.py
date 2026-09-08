#!/usr/bin/env python3
"""
Fix escape-drift corruption in JS files patched via the Hermes patch tool.
When the patch tool JSON-escapes string arguments, backslashes in JS regex
and string literals get doubled (\\\\n -> \\n, \\s -> \\s, etc.).

Usage:
  python3 scripts/fix_escapes.py js/tools/<file>.js
"""
import sys

def fix_escapes(filepath):
    """Fix double-escaped backslashes in a JS file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Fix double-escaped backslashes in string literals and regex
    content = content.replace('\\\\n', '\\n')
    content = content.replace('\\\\s', '\\s')
    content = content.replace('\\\\b', '\\b')
    content = content.replace('\\\\r', '\\r')
    content = content.replace('\\\\.', '\\.')

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed escapes in {{filepath}}")
        return True
    else:
        print(f"No escape issues found in {{filepath}}")
        return False

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python3 fix_escapes.py <file.js>")
        sys.exit(1)
    fix_escapes(sys.argv[1])
