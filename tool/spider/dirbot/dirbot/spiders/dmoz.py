from scrapy.spiders import Spider
from scrapy.selector import Selector

from dirbot.items import Website
import re
import json


from scrapy.selector import Selector
try:
    from scrapy.spider import Spider
except:
    from scrapy.spider import BaseSpider as Spider
from scrapy.utils.response import get_base_url
from scrapy.utils.url import urljoin_rfc
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor as sle


from xpinyin import Pinyin

class DmozSpider(CrawlSpider):
    name = "dmoz"
    allowed_domains = ["tencent.com"]
    start_urls = [
        "http://hr.tencent.com/position.php"
    ]
    rules = [
        Rule(sle(allow=("/position.php\?&start=\d{,4}#a")), follow=True, callback='parse_item')
    ]
    

    def parse_item(self, response):
        p = Pinyin()
        items = []
        sel = Selector(response)
        base_url = get_base_url(response)
        sites_even = sel.css('table.tablelist tr.even')
        for site in sites_even:
            item = Website()
            
            item['name'] = site.css('.l.square a').xpath('text()').extract()[0]
            item['description'] = site.css('tr > td:nth-child(2)::text').extract()[0]
            url=site.css('tr > td:nth-child(4)::text').extract()[0]
            item['url'] = p.get_initials(url,u'')
            item['address'] = url
            item['num'] = site.css('tr > td:nth-child(3)::text').extract()[0]
            item['uid'] = site.css('.l.square a').xpath('text()').extract()[0]
            items.append(item)
        return items
