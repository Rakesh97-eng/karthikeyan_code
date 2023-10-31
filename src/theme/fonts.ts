// Fonts
/* Regular Tobias*/
import RegularTobiasOtf from '../assets/fonts/Tobias-Regular.otf';
import RegularTobiasTtf from '../assets/fonts/Tobias-Regular.ttf';
import RegularTobiasWoff from '../assets/fonts/Tobias-Regular.woff';
import RegularTobiasWoff2 from '../assets/fonts/Tobias-Regular.woff2';
/* Regular Tobias Italic*/
import RegularItalicTobiasOtf from '../assets/fonts/Tobias-RegularItalic.otf';
import RegularItalicTobiasTtf from '../assets/fonts/Tobias-RegularItalic.ttf';
import RegularItalicTobiasWoff from '../assets/fonts/Tobias-RegularItalic.woff';
import RegularItalicTobiasWoff2 from '../assets/fonts/Tobias-RegularItalic.woff2';
/* Regular Cadiz*/
import CadizWebRegularWoff from '../assets/fonts/CadizWeb-Regular.woff';
import CadizWebRegularWoff2 from '../assets/fonts/CadizWeb-Regular.woff2';
/* Regular Cadiz Italic*/
import CadizWebRegularItalicWoff from '../assets/fonts/CadizWeb-RegularItalic.woff';
import CadizWebRegularItalicWoff2 from '../assets/fonts/CadizWeb-RegularItalic.woff2';
/* Cadiz Semi Bold*/
import CadizWebSemiBoldWoff from '../assets/fonts/CadizWeb-SemiBold.woff';
import CadizWebSemiBoldWoff2 from '../assets/fonts/CadizWeb-SemiBold.woff2';
/* Maison Neue Mono*/

import MaisonNeueMonoOtf from '../assets/fonts/Maison-Neue-Mono.otf';
/* Maison Neue Mono Bold*/
import MaisonNeueMonoBoldOtf from '../assets/fonts/Maison-Neue-Mono-Bold.otf';

const FontFamily = 'Tobias, Cadiz, Maison Neue';
const Fonts = `
    /* Regular Tobias*/
    @font-face {
        font-family: 'Tobias';
        src: url(${RegularTobiasOtf}) format('opentype'),
            url(${RegularTobiasTtf}) format('truetype'),
            url(${RegularTobiasWoff}) format('woff'),
            url(${RegularTobiasWoff2}) format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    /* Regular Tobias Italic*/
    @font-face {
        font-family: 'Tobias';
        src: url(${RegularItalicTobiasOtf}) format('opentype'),
            url(${RegularItalicTobiasTtf}) format('truetype'),
            url(${RegularItalicTobiasWoff}) format('woff'),
            url(${RegularItalicTobiasWoff2}) format('woff2');
        font-weight: normal;
        font-style: italic;
    }
    /* Regular Cadiz*/
    @font-face {
        font-family: 'Cadiz';
        src: url(${CadizWebRegularWoff}) format('woff'),
            url(${CadizWebRegularWoff2}) format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    /* Regular Cadiz Italic*/
    @font-face {
        font-family: 'Cadiz';
        src: url(${CadizWebRegularItalicWoff}) format('woff'),
            url(${CadizWebRegularItalicWoff2}) format('woff2');
        font-weight: normal;
        font-style: italic;
    }
    /* Cadiz Semi Bold*/
    @font-face {
        font-family: 'Cadiz';
        src: url(${CadizWebSemiBoldWoff}) format('woff'),
            url(${CadizWebSemiBoldWoff2}) format('woff2');
        font-weight: bold;
        font-style: normal;
    }
    /* Maison Neue Mono*/
    @font-face {
        font-family: 'Maison Neue';
        src: url(${MaisonNeueMonoOtf}) format('opentype');
        font-weight: normal;
        font-style: normal;
    }
    /* Maison Neue Mono Bold*/
    @font-face {
        font-family: 'Maison Neue';
        src: url(${MaisonNeueMonoBoldOtf}) format('opentype');
        font-weight: bold;
        font-style: normal;
    }
`;

export { Fonts, FontFamily };
