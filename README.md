# Automated-Resume-Extraction
## Installation
To begin install the module.

> npm install pdf-extract

After the library is installed you will need the following binaries accessible on your path to process pdfs.

pdftk
> pdftk splits multi-page pdf into single pages.
pdftotext
> pdftotext is used to extract text out of searchable pdf documents
ghostscript
> ghostscript is an ocr preprocessor which convert pdfs to tif files for input into tesseract
tesseract
> tesseract performs the actual ocr on your scanned images

## Ubuntu
pdftk can be installed directly via apt-get

> apt-get install pdftk
pdftotext is included in the poppler-utils library. To installer poppler-utils execute

> apt-get install poppler-utils
ghostscript can be install via apt-get

> apt-get install ghostscript
tesseract can be installed via apt-get. Note that unlike the osx install the package is called tesseract-ocr on Ubuntu, not tesseract

> apt-get install tesseract-ocr


## Windows
Important! You will have to add some variables to the PATH of your machine. You do this by right clicking your computer in file explorer, select Properties, select Advanced System Settings, Environment Variables. You can then add the folder that contains the executables to the path variable.

> pdftk can be installed using the PDFtk Server installer found here: https://www.pdflabs.com/tools/pdftk-server/ It should autmatically add itself to the PATH, if not, the default install location is "C:\Program Files (x86)\PDFtk Server\bin"

> pdftotext can be installed using the recompiled poppler utils for windows, which have been collected and bundled here: http://blog.alivate.com.au/poppler-windows/ Unpack these in a folder, (example: "C:\poppler-utils") and add this to the PATH.

> ghostscript for Windows can be found at: https://softfamous.com/gpl-ghostscript/ Make sure you download the General Public License and the correct version (32/64bit). Install it and go to the installation folder (default: "C:\Program Files\gs\gs9.19") and go into the bin folder. Rename the gswin64c to gs, and add the bin folder to your PATH.

> tesseract can be build, but you can also download an older version which seems to work fine. Downloads at: https://sourceforge.net/projects/tesseract-ocr-alt/files/ Version tested is tesseract-ocr-setup-3.02.02.exe, the default install location is "C:\Program Files (x86)\Tesseract-OCR" and is also added to the PATH. Note, this is only when you've checked that it will install for everyone on the machine.

Everything should work after all this! If not, try restarting to make sure the PATH variables are correctly used.
