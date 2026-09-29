# ADR 0008: Use a zero-dependency public-site build

## Status

Accepted

## Context

Publishing the repository root would expose private proposals, internal documentation, tests, source material, and Worker code. Contributors with limited technical experience must still be able to make ordinary HTML, CSS, JavaScript, and content changes without learning a framework or managing a large toolchain.

## Decision

Create one small Node script using only built-in Node APIs. It will copy an explicit allowlist of public-site files into `dist/`, exclude private and internal material, run or coordinate static validation, and generate deployment metadata and headers. It must never transform images or rewrite authored content.

Cloudflare Pages will run the existing Node regression tests and this build script. No package installation or third-party build dependency is required.

Document the author workflow in plain language: edit source files, preview locally, run the verification command, and push through the normal Git workflow. Error messages must name the file and the required correction.

## Consequences

- Public deployment contents are explicit and reviewable instead of being whatever happens to exist in the repository root.
- Non-technical contributors continue editing ordinary files and do not edit generated `dist/` output.
- The custom script is production code and needs tests, but it has no external dependency update burden.
- Adding a new public top-level route or asset category requires updating the allowlist intentionally.
