const Crawler = require('crawler');

const arrWordsFilter = [
  'Cartão de crédito',
  'Cartões de crédito',
  'Cartão de débito',
  'Nubank',
  'Banco Original',
  'Citibank',
  'Santander',
  'Guiabolso',
  'Banco Santander',
  'BTG Pactual',
  'BTG Digital',
  'Itaú',
  'Itaú Unibanco',
  'Bancos',
  'Bancos nacionais',
  'Intermedium',
  'Banco Intermedium',
  'Banco Neon',
  'Caixa Econômica',
  'Caixa Econômica Federal',
  'Banco do Brasil',
  'Banco Safra',
  'Banco',
  'Sofisa',
  'Banco Sofisa',
  'Sofisa Direto',
  'Banco digital',
  'BB Digital',
  'Organizze',
  'Carteira digital',
  'Betterment',
  'Atom Bank',
  'Lending Club',
  'Wealthfront',
  'Acorns',
  'SocietyOne',
  'Coinbase',
  'Robinhood',
  'Wise Banyan',
  'Charles Schwab',
  'Stash',
  'Wealthsimple',
  'Goldman Sachs',
  'Bluzelle',
  'Venmo',
  'Moven',
  'Chase Bank',
  'Fintech',
  'Fintechs',
  'Monzo',
  'PayPal',
  'WeChat',
  'Apple Pay',
  'Alibaba',
  'Mint.com',
  'Haven Life',
  'Personal Capital',
  'Money Dance',
  'iQuantifi',
  'financial app',
  'digital bank',
  'Chase',
  'Amex',
  'MasterCard',
  'Millennials',
  'Jovens',
  'Consumidores',
  'Pesquisa',
  'Geração Y',
  'Millennial',
  'Mobile',
  'Comportamento',
  'Usuários',
  'Consumo',
  'BOX1824',
  'Geração'
];

const arrWebsites = [
  'http://exame.abril.com.br',
  'http://exame.abril.com.br/negocios/',
  'http://exame.abril.com.br/economia/',
  'http://exame.abril.com.br/tecnologia/',
  'http://exame.abril.com.br/marketing/',
  'http://www.meioemensagem.com.br',
  'http://www.meioemensagem.com.br/home/comunicacao',
  'http://www.meioemensagem.com.br/home/marketing',
  'http://www.meioemensagem.com.br/home/midia',
  'http://finnovation.com.br/',
  'https://techcrunch.com/',
  'https://techcrunch.com/startups/',
  'https://techcrunch.com/mobile/',
  'https://techcrunch.com/enterprise/',
  'https://www.entrepreneur.com/',
  'https://www.entrepreneur.com/topic/innovation',
  'https://www.entrepreneur.com/topic/technology',
  'https://www.entrepreneur.com/topic/finance',
  'https://www.entrepreneur.com/topic/lifestyle',
  'https://www.entrepreneur.com/topic/marketing',
  'http://www1.folha.uol.com.br/',
  'http://www1.folha.uol.com.br/mercado/?cmpid=menutopo',
  'http://www1.folha.uol.com.br/mundo/?cmpid=menutopo',
  'http://www1.folha.uol.com.br/cotidiano/?cmpid=menutopo',
  'http://www.infomoney.com.br/',
  'http://www.infomoney.com.br/mercados',
  'http://www.infomoney.com.br/negocios',
  'https://www.fintechweekly.com/',
  'http://mashable.com',
  'http://mashable.com/tech/?utm_cid=mash-prod-nav-ch',
  'http://mashable.com/business/?utm_cid=mash-prod-nav-ch',
  'https://www.nytimes.com/',
  'http://www.nytimes.com/pages/business/index.html?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Business&WT.nav=page',
  'https://www.nytimes.com/section/technology',
  'http://www.valor.com.br',
  'http://www.valor.com.br/brasil',
  'http://www.valor.com.br/financas',
  'http://www.valor.com.br/empresas',
  'https://canaltech.com.br/',
  'https://canaltech.com.br/tag/Business-Intelligence/',
  'https://canaltech.com.br/tag/Android/',
  'https://canaltech.com.br/tag/iOS/',
  'https://www.forbes.com/',
  'https://www.forbes.com/business/#1f513271535f',
  'https://www.forbes.com/technology/#34915c774bad',
  'https://www.forbes.com/entrepreneurs/#73a198543035',
  'https://www.forbes.com/forbeslife/#d51fd8f44b71',
  'http://www.forbes.com.br/',
  'http://www.forbes.com.br/negocios/',
  'http://gizmodo.uol.com.br/',
  'http://us.gizmodo.com',
  'http://fortune.com/',
  'http://fortune.com/section/finance/',
  'http://fortune.com/section/tech/',
  'http://fortune.com/section/venture/',
  'http://www.estadao.com.br/',
  'http://economia.estadao.com.br/',
  'http://internacional.estadao.com.br/',
  'http://link.estadao.com.br/',
  'http://link.estadao.com.br/inovacao',
  'http://link.estadao.com.br/cultura-digital',
  'http://link.estadao.com.br/empresas',
  'https://www.tecmundo.com.br/',
  'https://www.fastcompany.com/',
  'https://www.fastcoexist.com/',
  'https://www.fastcocreate.com/',
  'http://www.bbc.com/portuguese',
  'http://www.bbc.com/portuguese/brasil',
  'http://www.bbc.com/portuguese/topics/ca170ae3-99c1-48db-9b67-2866f85e7342',
  'http://www.bbc.com/portuguese/topics/31684f19-84d6-41f6-b033-7ae08098572a',
  'http://www.bbc.com/news',
  'http://www.bbc.com/news/world',
  'http://www.bbc.com/news/business',
  'http://www.bbc.com/news/technology',
  'https://www.wired.com/',
  'https://www.wired.com/category/business/',
  'https://www.wired.com/category/gear/',
  'http://g1.globo.com/',
  'http://g1.globo.com/economia/',
  'http://g1.globo.com/tecnologia/',
  'https://olhardigital.uol.com.br/',
  'https://olhardigital.uol.com.br/noticias',
  'http://br.reuters.com/',
  'http://br.reuters.com/news/business',
  'http://www.reuters.com/',
  'http://www.reuters.com/finance',
  'http://www.reuters.com/news/technology',
  'http://www.reuters.com/finance/personal-finance',
  'http://www.administradores.com.br/',
  'http://www.administradores.com.br/negocios/',
  'http://www.administradores.com.br/marketing/',
  'http://www.administradores.com.br/cotidiano/',
  'http://www.administradores.com.br/especial/inovacao/',
  'http://computerworld.com.br/',
  'http://computerworld.com.br/cloud-computing',
  'http://computerworld.com.br/big-data',
  'http://computerworld.com.br/tecnologias-emergentes',
  'http://computerworld.com.br/ultimas-noticias',
  'http://www.computerworld.com/',
  'http://www.computerworld.com/category/cloud-computing/',
  'http://www.computerworld.com/category/consumerization-of-it/',
  'http://www.computerworld.com/category/mobile-wireless/',
  'http://epocanegocios.globo.com/',
  'http://epocanegocios.globo.com/Economia/index.html',
  'http://epocanegocios.globo.com/Empresa/index.html',
  'http://epocanegocios.globo.com/Mercado/index.html',
  'http://epocanegocios.globo.com/Dinheiro/index.html',
  'http://epocanegocios.globo.com/Mundo/index.html',
  'http://epocanegocios.globo.com/Tecnologia/index.html',
  'http://epocanegocios.globo.com/Marketing/index.html',
  'http://adnews.com.br/',
  'http://adnews.com.br/tecnologia/',
  'http://adnews.com.br/adarticles/',
  'http://adnews.com.br/negocios/',
  'http://www.businessinsider.com/',
  'http://www.businessinsider.com/trending',
  'http://www.businessinsider.com/clusterstock',
  'http://www.businessinsider.com/sai',
  'http://www.businessinsider.com/warroom',
  'http://www.businessinsider.com/thelife',
  'https://www.nexojornal.com.br/',
  'https://www.nexojornal.com.br/tags/Temas/Economia',
  'https://www.nexojornal.com.br/tags/Temas/Internacional',
  'https://www.nexojornal.com.br/tags/Temas/Sociedade',
  'https://www.nexojornal.com.br/tags/Temas/Tecnologia'
];

class CrawlerClss {

  constructor() {
    console.log('CrawlerClss constructor');
  }

  getLinks() {

    let c = new Crawler;
    let arrPromises = [];

    for( let x in arrWebsites ) {
      var promise = new Promise((resolve, reject) => {

        c.queue([{
            uri: arrWebsites [x ],
            callback: (error, res, done) => {
              if(error){
                reject(Error("It broke"));
              } else {
                let filterDataCrawler = this.filterDataCrawler( res.$, res.request.uri.href );
                resolve(filterDataCrawler);
              }
              done();
            }
        }]);
      });

      arrPromises.push( promise );

    }

    return Promise.all( arrPromises );

  }

  filterDataCrawler( $, title ) {
    var links = {
      website: title,
      urls: []
    };
    var aTag = $('a').toArray();

    let aTagNew = aTag.reduce((newArray, b) => {
      let text = $(b).text().replace(/\s+/g, ' ');

      if( text.length > 30 ) {
        newArray.push({
          text: text,
          link: b.attribs.href
        });
      }

      return newArray;
    }, []);

    let foo = aTagNew;

    if( aTag.length ) {
      foo.forEach(function(elem, i){
        var text = elem.text;
        var href = elem.link;

        for( var n in arrWordsFilter ) {
          if( text.match(new RegExp(arrWordsFilter[n],'g')) ) {
            links.urls.push({
              text: text,
              href: href
            });
            break;
          }
        }
      });
    };

    return links;
  }

}

module.exports = CrawlerClss;