param(
  [Parameter(Mandatory = $true)]
  [string]$TargetPath,
  [string]$OverlayPath,
  [switch]$Force
)

$ErrorActionPreference = 'Stop'

function Copy-DirectoryContents {
  param(
    [Parameter(Mandatory = $true)]
    [string]$SourceDir,
    [Parameter(Mandatory = $true)]
    [string]$DestinationDir
  )

  if (-not (Test-Path -LiteralPath $SourceDir)) {
    throw "Missing source directory: $SourceDir"
  }

  New-Item -ItemType Directory -Force -Path $DestinationDir | Out-Null
  Get-ChildItem -LiteralPath $SourceDir -Force | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $DestinationDir -Recurse -Force
  }
}

$workspaceRoot = Split-Path -Parent $PSScriptRoot
$resolvedTarget = if ([System.IO.Path]::IsPathRooted($TargetPath)) {
  [System.IO.Path]::GetFullPath($TargetPath)
} else {
  [System.IO.Path]::GetFullPath((Join-Path (Get-Location) $TargetPath))
}

if ((Test-Path -LiteralPath $resolvedTarget) -and -not $Force) {
  $existingItems = Get-ChildItem -LiteralPath $resolvedTarget -Force
  if ($existingItems.Count -gt 0) {
    throw "Target directory is not empty. Re-run with -Force if you want to overlay files: $resolvedTarget"
  }
}

New-Item -ItemType Directory -Force -Path $resolvedTarget | Out-Null

$methodKitSource = Join-Path $workspaceRoot 'agentic-method-kit'
$repoShellSource = Join-Path $workspaceRoot 'agentic-repo-shell'

Copy-DirectoryContents -SourceDir $methodKitSource -DestinationDir (Join-Path $resolvedTarget 'agentic-method-kit')
Copy-DirectoryContents -SourceDir $repoShellSource -DestinationDir $resolvedTarget

if ($OverlayPath) {
  $overlaySource = if ([System.IO.Path]::IsPathRooted($OverlayPath)) {
    $OverlayPath
  } else {
    Join-Path $workspaceRoot $OverlayPath
  }
  Copy-DirectoryContents -SourceDir $overlaySource -DestinationDir $resolvedTarget
}

Write-Host "Bootstrap complete: $resolvedTarget"
$included = 'agentic-method-kit, agentic-repo-shell contents'
if ($OverlayPath) {
  $included = "$included, overlay applied from $OverlayPath"
}
Write-Host "Included: $included"
