function findgeo(name,content)
{
    var geodata=[
        {"name":"beijing" ,
        "chname": "北京",
        "lon":116.46,
        "lat":39.92,
        "content":""
        },
        {"name":"shenzhen" ,
        "chname": "深圳",
        "lon":114.186124,
        "lat":22.293586,
        "content":""
        },
        {"name":"neimenggu" ,
        "chname": "内蒙古自治区",
        "lon":118.87,
        "lat":42.28,
        "content":""
        },
        {"name":"changsha",
        "chname":"长沙",
        "lon":113,
        "lat":28.21,
        "content":""
        },
        {"name":"wuhan",
         "chname": "武汉",
         "lon": 114.31,
         "lat":30.52,
         "content":""
        }
    ];
    for(var i=0;i<geodata.length;i++)
    {
        if(geodata[i].name==name)
        {
            geodata[i].content=content;
            return geodata[i];
        }
    }
    return null;
}

function loadsearch()
{

}

function loadagg()
{
    var resource = "http://127.0.0.1:3002/td/loadagg";// "http://www.faruxue1688.com/td/loadagg";
    $.ajax({
        url: resource,
        type: "get",
        cache: false,
        async: false,
        scrossDomain: true,
        success: function(msg) {
            data=JSON.parse(msg);
            for(i=0;i<data.length;i++)
            {
                geodata=findgeo(data[i].key,data[i].doc_count);
                if(geodata!=null)
                {
                    aggdata.push(geodata);
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status);
        },
        complete: function(XMLHttpRequest, textStatus) {
            require(['js/init'], function(js) {
                if(js!=null)
                {
                    var myDate = new Date();
                    var hours=myDate.getHours();
                    var minutes=myDate.getMinutes();
                    var seconds=myDate.getSeconds();
                    alert("大数据更新于"+hours+"时"+minutes+"分"+seconds+"秒");
                    viewer.entities.removeAll();
                    for(var i=0;i<aggdata.length;i++)
                        js.test2(viewer,aggdata[i].chname+":"+aggdata[i].content+"条招聘信息",aggdata[i].lon,aggdata[i].lat);
                }
            });
        }
    });
}