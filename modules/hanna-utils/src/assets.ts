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
 */
export let styleServerUrl = _defaultStyleServerUrl;

/**
 * This updates the value of `styleServerUrl` globally. Use it when you want to
 * load assets and CSS bundles from a custom style-server instance, e.g. during
 * testing/staging/etc.
 *
 * _(NOTE: `setStyleServerUrl.reset()` resets the `styleServerUrl` back to its
 * DEFAULT value.)_
 */
export const setStyleServerUrl = (url: string | URL) => {
  // NOTE: This DOES throw if user passes an invalid URL string
  url = typeof url === 'string' ? new URL(url) : url;
  styleServerUrl = url.toString();
};
setStyleServerUrl.reset = () => {
  styleServerUrl = _defaultStyleServerUrl;
};

// ---------------------------------------------------------------------------

/**
 * Based on "https://styles.reykjavik.is/assets/illustrations/files.json"
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
 * Based on "https://styles.reykjavik.is/assets/efnistakn/files.json"
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
 * Based on "https://styles.reykjavik.is/assets/formheimur/files.json"
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
 * Based on "https://styles.reykjavik.is/assets/bling/files.json"
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

export const getAssetUrl = (file: string): string => styleServerUrl + '/assets/' + file;

export const getIllustrationUrl = (illustration: Illustration): string =>
  getAssetUrl('illustrations/' + illustration + '.png');
export const getEfnistaknUrl = (icon: Efnistakn): string =>
  getAssetUrl('efnistakn/' + icon + '.svg');
export const getFormheimurUrl = (shapes: Formheimur): string =>
  getAssetUrl('formheimur/' + shapes + '.svg');
export const getBlingUrl = (blingType: BlingType): string =>
  getAssetUrl('bling/' + blingType + '.svg');
