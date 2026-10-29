# PowerPoint Generation (pptxgenjs)

Create professional PowerPoint (.pptx) presentations using Node.js and pptxgenjs library.

## Tools

- **Primary**: Node.js library `pptxgenjs` (install with `npm install pptxgenjs`)
- **Preview/QA**: LibreOffice (soffice) and poppler (`pdftoppm`)

## Build Rules

1. **Layout setup**: Set `pres.layout = 'LAYOUT_16x9'` first (canvas 10" x 5.625"). Add slides after this.

2. **Color format**: Always use 6-digit hex colors WITHOUT the `#` prefix (e.g., "4F46E5"). Using `#` or 8-digit hex will corrupt the file. For transparency, use the `transparency` option instead.

3. **Options objects**: Never share the same options object between two different calls (pptxgenjs mutates it). Create a new object each time.

4. **Shadow offset**: Never use negative shadow offsets.

5. **Letter spacing**: Use `charSpacing` for letter spacing, NOT `letterSpacing`.

6. **Bullets**: Use `bullet: true` for bullets, never write the "•" character manually. Apply `breakLine: true` to each item (except the last). Use `paraSpaceAfter` for spacing.

7. **Text boxes**: Always set `isTextBox: true` in every text box. Use `margin: 0` when aligning with a shape.

8. **Rounded corners**: Rounded corners only work on `roundRect` shapes (using `rectRadius`).

9. **Gradients**: Gradient fill is NOT supported. Use background images for gradients instead.

10. **Charts**: Create charts using native `addChart()`, not images.

11. **Speaker notes**: Put speaker notes in `slide.addNotes()`, not as text boxes on the slide.

12. **Single instance**: Use only one `new pptxgen()` instance per output file.

## Design Rules

- Choose a consistent palette and font (e.g., dark navy + indigo/teal accent)
- Keep text minimal: heading, 3-4 short points, or cards
- Leave at least 0.5" margin from slide edges
- Ensure contrast: light text on dark background, dark text on light background

## QA (Required)

1. **Validate file**: Check zip/XML structure
2. **Convert to PDF**: `soffice --headless --convert-to pdf deck.pptx`
3. **Generate images**: `pdftoppm -jpeg -r 150 deck.pdf slide`
4. **Review each slide**: Check for text overflow, overlapping elements, low contrast, very small gaps, text breaking in the middle
5. **Fix and repeat**: If problems found, fix in generator script and re-run all steps

## Final Output

- Deliver only the .pptx file
- Include a 1-2 line summary
