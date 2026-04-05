const middleware = {}

middleware['checkCategoryExists'] = require('..\\middleware\\checkCategoryExists.js')
middleware['checkCategoryExists'] = middleware['checkCategoryExists'].default || middleware['checkCategoryExists']

middleware['checkPageQueryParam'] = require('..\\middleware\\checkPageQueryParam.js')
middleware['checkPageQueryParam'] = middleware['checkPageQueryParam'].default || middleware['checkPageQueryParam']

middleware['checkPromoExists'] = require('..\\middleware\\checkPromoExists.js')
middleware['checkPromoExists'] = middleware['checkPromoExists'].default || middleware['checkPromoExists']

middleware['checkSlug'] = require('..\\middleware\\checkSlug.js')
middleware['checkSlug'] = middleware['checkSlug'].default || middleware['checkSlug']

middleware['getMetaInfo'] = require('..\\middleware\\getMetaInfo.js')
middleware['getMetaInfo'] = middleware['getMetaInfo'].default || middleware['getMetaInfo']

middleware['routerStrictRedirestion'] = require('..\\middleware\\routerStrictRedirestion.js')
middleware['routerStrictRedirestion'] = middleware['routerStrictRedirestion'].default || middleware['routerStrictRedirestion']

export default middleware
