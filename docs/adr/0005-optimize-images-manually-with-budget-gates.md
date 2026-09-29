# ADR 0005: Optimize images manually with budget gates

## Status

Accepted

## Context

Automatic image conversion would add build dependencies and could apply unsuitable compression settings across visually different asset classes. The team prefers deliberate local conversion and human visual judgment over a pipeline that mutates images on every build.

## Decision

Optimize existing images in a deliberate one-time local pass and commit the accepted AVIF, WebP, SVG, PNG, or JPEG production assets. For each future content change, the contributor must prepare responsive variants locally, review them visually, and commit only the final deployable files.

Do not add an image-processing dependency to the production or Cloudflare Pages build. Add dependency-free static tests that reject images exceeding documented byte, dimension, format, or markup budgets, but never rewrite an asset. After final variants pass visual comparison, browser verification, and performance checks, source images may be removed from the current repository tree.

Apply these initial public-site budgets:

- LCP image variant: at most 80 KB on mobile and 160 KB on desktop.
- All initially required images: at most 150 KB on mobile and 300 KB on desktop.
- Ordinary raster variant: at most 100 KB.
- Inline evidence screenshot containing text: at most 200 KB.
- Full evidence asset loaded only after an explicit open action: at most 500 KB.
- Ordinary raster width: at most 1,440 pixels.

An exception requires a documented visual comparison showing that the budget causes unacceptable degradation.

Do not mandate one image encoder or desktop application initially. For each prepared image, record the final format and dimensions, byte size before and after optimization, the encoder quality or relevant settings, visual review at 1x and 2x, and the mobile and desktop result. Automated checks validate the committed output rather than the brand of tool used. Never upload private client images to a third-party online compressor.

## Consequences

- Maintainers retain direct control over the encoder, quality setting, crop, and final visual result.
- The normal deploy does not execute native image codecs or depend on an image-processing package.
- Image preparation remains a documented manual responsibility for every new article or page.
- Automated checks can detect oversized files or missing responsive markup but cannot decide whether an image looks acceptable.
- Contributors may choose a reputable local encoder that produces a compliant, visually accepted result without adding it to the site build.
- Deleting the source image limits future recropping and re-encoding to the quality present in the accepted production variants unless the source is reacquired.
