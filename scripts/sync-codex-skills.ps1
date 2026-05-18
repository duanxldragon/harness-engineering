param(
  [Parameter(Mandatory = $false)]
  [string]$SourceSkillsPath = "$env:USERPROFILE\.codex\skills",
  [switch]$Force
)

$ErrorActionPreference = 'Stop'

function Copy-Path {
  param(
    [Parameter(Mandatory = $true)]
    [string]$SourcePath,
    [Parameter(Mandatory = $true)]
    [string]$DestinationPath
  )

  if (-not (Test-Path -LiteralPath $SourcePath)) {
    throw "Missing source path: $SourcePath"
  }

  $item = Get-Item -LiteralPath $SourcePath
  if ($item.PSIsContainer) {
    New-Item -ItemType Directory -Force -Path $DestinationPath | Out-Null
    Get-ChildItem -LiteralPath $SourcePath -Force | ForEach-Object {
      Copy-Item -LiteralPath $_.FullName -Destination $DestinationPath -Recurse -Force
    }
    return
  }

  $parent = Split-Path -Parent $DestinationPath
  if ($parent) {
    New-Item -ItemType Directory -Force -Path $parent | Out-Null
  }
  Copy-Item -LiteralPath $SourcePath -Destination $DestinationPath -Force
}

$workspaceRoot = Split-Path -Parent $PSScriptRoot
$targetSkillsPath = Join-Path $workspaceRoot '.codex\skills'

if ((Test-Path -LiteralPath $targetSkillsPath) -and -not $Force) {
  $existingItems = Get-ChildItem -LiteralPath $targetSkillsPath -Force
  if ($existingItems.Count -gt 0) {
    throw "Target skills path is not empty. Re-run with -Force if you want to refresh: $targetSkillsPath"
  }
}

New-Item -ItemType Directory -Force -Path $targetSkillsPath | Out-Null

Get-ChildItem -LiteralPath $SourceSkillsPath -Force | ForEach-Object {
  Copy-Path -SourcePath $_.FullName -DestinationPath (Join-Path $targetSkillsPath $_.Name)
}

Write-Host "Synced Codex skills from $SourceSkillsPath to $targetSkillsPath"
