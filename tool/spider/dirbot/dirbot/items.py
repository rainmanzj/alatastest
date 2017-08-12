from scrapy.item import Item, Field


class Website(Item):
    uid = Field()
    name = Field()
    description = Field()
    url = Field()
    address=Field()
    num=Field()
    
