// const urlBase = 'http://localhost:8934/api/restful/'
const urlBase = 'https://desanet1.contraloria.gob.pe/Graficos/api/restful/'

const valida_dni_url = urlBase + 'padre-familia/valida-dni'
const genera_captcha_url = urlBase + 'captcha/genera-captcha'
const region_get_url = urlBase + 'region/region-get-all'
const provincia_get_url = urlBase + 'provincia/provincia-get-all-by-region'
const distrito_get_url = urlBase + 'distrito/distrito-get-all-by-provincia'
const institucion_get_url = urlBase + 'inst-edu/inst-edu-get-all-by-ubigeo'
const pregunta_url = urlBase + 'pregunta/pregunta-get-all'
const veeduria_url = urlBase + 'veeduria/veeduria-insert-all'
const valida_existe_dni_url = urlBase + 'estudiante/valida-dni'
const formato_get_url = urlBase + 'formato/formato-get-all'

export {
    valida_dni_url,
    genera_captcha_url,
    region_get_url,
    provincia_get_url,
    distrito_get_url,
    institucion_get_url,
    pregunta_url,
    veeduria_url,
    valida_existe_dni_url,
    formato_get_url,
}


