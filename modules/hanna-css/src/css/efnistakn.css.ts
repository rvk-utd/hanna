import { css, str } from 'es-in-css';

const efnistakn = [
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
];

export default css`
  ${efnistakn.map((icon) => {
    const path = `/assets/efnistakn/${icon}.svg`;
    return css`
      [data-efnistakn=${icon}] {
        --efnistakn: url(${str(path)});
      }
    `;
  })}
`;
