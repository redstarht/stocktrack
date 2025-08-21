# -*- mode: python ; coding: utf-8 -*-

paths = [
         './'
         ]

a = Analysis(
    ['app.py'],
    pathex=[],
    binaries=[],
    datas=[('C:/z/app/stocktrack/myapp/templates', 'templates'), ('C:/z/app/stocktrack/myapp/static', 'static'), ('C:/z/app/stocktrack/instance', 'instance'), ('C:/z/app/stocktrack/seed', 'seed')],
    hiddenimports=['flask', 'jinja2'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='app',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='app',
)
