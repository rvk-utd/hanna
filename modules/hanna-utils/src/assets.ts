// ---------------------------------------------------------------------------

// Add this workaround for remix_run as it's build script
// does not allow string replacing process.env.* build variables
// See: https://github.com/remix-run/remix/discussions/3541
declare const _NPM_PUB_: boolean;

const _defaultStyleServerUrl =
  typeof _NPM_PUB_ !== 'undefined' || process.env.NODE_ENV === 'production'
    ? 'https://styles.reykjavik.is'
    : 'http://localhost:4000';

/**
 * This URL is used when building links to graphic/styling assets, etc.
 *
 * Use `setStyleServerUrl` to change it.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#styleserverurl
 */
export let styleServerUrl = _defaultStyleServerUrl;

const history: Array<string> = [];

/**
 * This updates the value of `styleServerUrl` globally. Use it at the top of your
 * application if you want to load assets and CSS bundles from a custom
 * style-server instance, e.g. during testing/staging/etc.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#setstyleserverurl
 */
export const setStyleServerUrl = (url: string | URL | undefined) => {
  // NOTE: This THROWS if user passes an invalid URL string
  url = typeof url === 'string' ? new URL(url) : url;
  styleServerUrl = url
    ? (url.toString().split(/[#?]/) as [string])[0].replace(/\/+$/, '')
    : _defaultStyleServerUrl;
  history.unshift(styleServerUrl);
};

/**
 * Unsets the last pushed `setStyleServerUrl`
 */
setStyleServerUrl.pop = () => {
  history.shift();
  styleServerUrl = history[0] || _defaultStyleServerUrl;
};

/** @deprecated Use `setStyleServerUrl.pop()` instead (Will be removed in v0.3) */
setStyleServerUrl.reset = setStyleServerUrl.pop;

// ---------------------------------------------------------------------------

/**
 * List of "Illustration" names/ids
 * based on "https://styles.reykjavik.is/assets/illustrations/files.json"
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#illustrations
 */
export const illustrations = [
  'allirsaman1',
  'allirsaman1b',
  'arstid_haust',
  'arstid_sumar',
  'arstid_vetur',
  'arstid_vor',
  'atvinna1',
  'atvinna2',
  'atvinna3',
  'baekurlestur',
  'bekkur',
  'borgarstjori1',
  'borgarstjori2',
  'borgarstjori3',
  'borgarstjori4',
  'born1',
  'born2',
  'born3',
  'born4',
  'breidholt',
  'breyting',
  'byggingar1',
  'draumar',
  'egsethig',
  'eldriborgari',
  'esjan',
  'ferdalag',
  'fjarhagsadstod',
  'fjarmal1',
  'fjarmal2',
  'fjarmal3',
  'fjarmal4',
  'fjolbreytni',
  'fjolmenning',
  'fjolskylda',
  'flaekja',
  'forsida',
  'forsida-17juni',
  'forsida-blidvidri',
  'forsida-rigning',
  'forsida-snjor',
  'framkvaemdir1',
  'framkvaemdir2',
  'framkvaemdir3',
  'framkvaemdir4',
  'fundargerd1',
  'fundur',
  'gaes',
  'gaman',
  'haelisleitendur',
  'hanna-benda',
  'hanna-gjuggiborg',
  'hanna-god_spurning',
  'hanna-hae',
  'hanna-hahaha',
  'hanna-hissa',
  'hanna-hugsi',
  'hanna-vandro',
  'hanna-veitiggi',
  'haus1',
  'haus2',
  'haus3',
  'haus4',
  'haus5',
  'haus6',
  'haus7',
  'haus8',
  'haus9',
  'hjalpastad',
  'hopur',
  'hopur2',
  'hopur3',
  'hroki',
  'hundar',
  'ingolfur',
  'jafnvaegi',
  'kanina',
  'katur',
  'kettir',
  'kisa',
  'kjotsupa',
  'kongulo',
  'kort',
  'kreist',
  'krofuganga',
  'landslag',
  'laugardalur',
  'leikur_ibuar',
  'leikur',
  'logga',
  'logogregla',
  'maelt',
  'matur1',
  'mavar',
  'midbaer',
  'minarsidur',
  'mismunur',
  'naering',
  'nam_lestur',
  'nattura',
  'ofurfjolskylda',
  'oliprik',
  'ond',
  'peningar',
  'postit',
  'pulsa',
  'rad1',
  'rad2',
  'rad3',
  'raekta',
  'rafskuta',
  'reikningur1',
  'reikningur1b',
  'ruslabill',
  'samstarf',
  'samvinna1',
  'samvinna2',
  'samvinna3',
  'samvinna4',
  'sjor',
  'skipurit',
  'skokk',
  'skordyr',
  'skrifstofa',
  'skrifstofa2',
  'skrudganga',
  'stakthus',
  'sterkur',
  'stofnun',
  'stress',
  'stud',
  'sund1',
  'sund2',
  'svanurkisa',
  'svanurkisa-b',
  'svanurond',
  'svid1',
  'svid2',
  'sybbin',
  'tholendur_hjalp',
  'threytt',
  'tolfraedi1',
  'tolfraedi2',
  'tomstundir1',
  'tomstundir2',
  'tomstundir3',
  'tomstundir4',
  'tonlist',
  'umhverfi1',
  'umhverfi2',
  'umhverfi3',
  'utgefidefni',
  'utivinna',
  'vegvisir',
  'velferd1',
  'velferd2',
  'velferd3',
  'velferd4',
  'verlsa',
  'vesturbaer',
  'vinir',
  'vinna',
] as const;
export type Illustration = typeof illustrations[number];

// ---------------------------------------------------------------------------

/**
 * List of "Efnistákn" icon names/ids
 * based on "https://styles.reykjavik.is/assets/efnistakn/files.json"
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#efnistákn-icons
 */
export const efnistakn = [
  'bygging_01',
  'download_01',
  'dyrahald_01',
  'ferdalag_01',
  'fjarmal_01',
  'fjarmal_02',
  'fjarmal_03',
  'fjarmal_04',
  'fjarmal_05',
  'fjarmal_06',
  'flottafolk_01',
  'fylgigogn_01',
  'fylgigogn_02',
  'fylgigogn_03',
  'gogn_01',
  'gogn_02',
  'gogn_03',
  'gogn_04',
  'handaband_01',
  'husnaedisvandi_01',
  'hvad_01',
  'hvar_01',
  'hvar_02',
  'hvenaer_01',
  'hver_01',
  'mannfolk_01',
  'samband_01',
  'senda_01',
  'senda_02',
  'skipurit_01',
  'skipurit_02',
  'skoli_01',
  'skoli_02',
  'skoli_03',
  'stadur_01',
  'stofnun_01',
  'stofnun_02',
  'sund_barnalaug',
  'sund_eimbad',
  'sund_heiturpottur',
  'sund_kaldurpottur',
  'sund_metralaug',
  'sund_sauna',
  'sund_sundfot',
  'sund_utiklefi',
  'timi_01',
  'tomstundir_01',
  'tonlist_01',
  'tonlist_02',
  'tonlist_03',
  'tonlist_04',
  'umsokn_01',
  'umsokn_02',
  'upload_01',
  'velferd_01',
  'velferd_02',
  'velferd_03',
  'verdlaun_01',
  'verdlaun_02',
  'wifi',
] as const;
export type Efnistakn = typeof efnistakn[number];

// ---------------------------------------------------------------------------

/**
 * List of "Formheimur" shape names/ids
 * based on "https://styles.reykjavik.is/assets/formheimur/files.json"
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#formheimur-shapes
 */
export const formheimur = [
  'blokkir',
  'bru',
  'esjan',
  'fjoll',
  'folk',
  'gogn',
  'gotur',
  'hofnin',
  'husthok',
  'kubbar',
  'leikvollur',
  'perlan',
  'radhusid',
  'rolo',
  'sjorinn',
  'sund',
] as const;
export type Formheimur = typeof formheimur[number];

// ---------------------------------------------------------------------------

/**
 * List of "Bling" shape names/ids
 * based on "https://styles.reykjavik.is/assets/bling/files.json"
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#bling-shapes
 */
export const blingTypes = [
  'arrow-right-large',
  'bowl-medium',
  'box-medium',
  'circle-small',
  'circle-medium',
  'circle-large',
  'circle-waves-vertical',
  'circle-xlarge',
  'dome-large',
  'halfcircle-down-large',
  'loops-small',
  'pentagon-large',
  'snake-large',
  'triangle-small',
  'triangle-large',
  'waves-medium',
  'waves-vertical-medium',
  'interesting',
  'box-triangle',
  'box-bowl',
] as const;
export type BlingType = typeof blingTypes[number];

// ===========================================================================

/**
 * Generates a URL to arbitrary asset on on the style server.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#misc-style-server-assets
 */
export const getAssetUrl = (file: string): string => styleServerUrl + '/assets/' + file;

/**
 * Generates a URL to a Hanna "Illustration" on the style server.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#illustrations
 */
export const getIllustrationUrl = (illustration: Illustration): string =>
  getAssetUrl('illustrations/' + illustration + '.png');

/**
 * Generates a URL to a Hanna "Efnistákn" icon on the style server.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#efnistákn-icons
 */
export const getEfnistaknUrl = (icon: Efnistakn): string =>
  getAssetUrl('efnistakn/' + icon + '.svg');

/**
 * Generates a URL to a Hanna "Formheimur" shape on the style server.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#formheimur-shapes
 */
export const getFormheimurUrl = (shapes: Formheimur): string =>
  getAssetUrl('formheimur/' + shapes + '.svg');

/**
 * Generates a URL to a Hanna "Bling" shape on the style server.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#bling-shapes
 */
export const getBlingUrl = (blingType: BlingType): string =>
  getAssetUrl('bling/' + blingType + '.svg');
