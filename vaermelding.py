# -*- coding: utf-8 -*-
import sys
import requests
import json
import xml.etree.ElementTree as ET
import datetime



#Parametre sendt til scriptet
Sted = ''
for i in range(1, len(sys.argv)):
    Sted += str(sys.argv[i])
    if len(sys.argv) > (i + 1):
        Sted += '%20'

#Standard sted om annet ikke er oppgitt
if Sted == '':
    Sted = 'Oslo'

#Variabler
vær🍆 = {
    "Sun":"\u2600",
    "Cloud":"\u2601",
    "PartlyCloud":"\u26c5",
    "LightCloud":"\U0001F324",
    "LightRain":"\U0001F4A7",
    "Drizzle":"\U0001F4A7",
    "Rain":"\u26c6",#\U0001F327
    "LightRainSun":"\U0001F326"
}

def hentKoordinater(sokSted):
    #https://developer.here.com/api-explorer/rest/places/places-search-by-query
    #Nåværende sted (Standard er tilfeldig sted i Norge for bedre relaterte søk)
    xcor = '61.6638'
    ycor = '8.1171'
    stedHeader = "at={}%2C{}".format(xcor, ycor)

    #Søkstekst
    sokHeader = "q={}".format(sokSted)

    #app_id
    appId = 'tYq0oRvbhpZNTjGb7reT'
    appIdHeader = "app_id={}".format(appId)

    #app_code
    appCode = 'gnoO_QP7q5PnKnmQSHzmjw'
    appCodeHeader = "app_code={}".format(appCode)

    #Lager tilkoblingsurl
    url = "https://places.api.here.com/places/v1/discover/search?{}&{}&{}&{}".format(stedHeader, sokHeader, appIdHeader, appCodeHeader)

    #Henter info
    respons = requests.get(url)
    resJSON = json.loads(respons.text)
    xCorMaal = resJSON['results']['items'][0]['position'][0]
    yCorMaal = resJSON['results']['items'][0]['position'][1]
    navn = resJSON['results']['items'][0]['title']
    type = resJSON['results']['items'][0]['category']['title']

    #Returnerer koordinater
    return xCorMaal, yCorMaal, navn, type


def hentVaer(posXCor, posYCor):
    #https://api.met.no/weatherapi/locationforecastlts/1.3/documentation
    xHeader = "lat={}".format(posXCor)
    yHeader = "lon={}".format(posYCor)

    url = "https://api.met.no/weatherapi/locationforecastlts/1.3/?{}&{}".format(xHeader,yHeader)

    #Henter vær-info
    respons = requests.get(url)
    resXML = ET.fromstring((respons.text))

    #Finner nyttige meldinger
    tempTid = ''
    tempNedbørTid = ''
    tempSymbolTid = ''
    meldinger = []
    for item in resXML[1]:
        try:
            if item.attrib['to'] != tempTid:
                tempTid = item.attrib['to']
                tempNedbørTid = ''
                tempSymbolTid = ''
                dict = {
                    "tid": item.attrib['to'],
                    "grader": item[0][0].attrib['value'],
                    "vindretning": item[0][1].attrib['name'],
                    "vind": item[0][2].attrib['name'],
                    "høyde": item[0].attrib['altitude'],
                    "xCor": item[0].attrib['latitude'],
                    "yCor": item[0].attrib['longitude'],
                    "symbol": "*"
                }
                #print(dict['tid'], dict['grader'])
                meldinger.append(dict)
            if item[0][0].tag == 'precipitation' and item.attrib['from'] > tempNedbørTid:
                meldinger[-1]['nedbør'] = item[0][0].attrib['value']
                tempNedbørTid = item.attrib['from']
            if item[0][1].tag == 'symbol' and item.attrib['from'] > tempSymbolTid:
                meldinger[-1]['symbol'] = item[0][1].attrib['id']
                tempNedbørTid = item.attrib['from']
        except Exception as e:
            continue
    return meldinger


def formaterTekst(liste, navn, type):
    str = "{} - {}\n".format(navn, type)
    for punkt in liste:
        punkt['tid'] = datetime.datetime.strptime(punkt['tid'], "%Y-%m-%dT%H:%M:%Sz")
        if punkt['tid'].hour % 6 == 0:
            #print(punkt)
            a = punkt['symbol']
            punkt['symbol'] = vær🍆.get(a, "*")
            str += "{0:<15} {3:>8}mm \t{1:<5} {2}\u00b0C\n".format(punkt['tid'].strftime("%d/%m %H:%M"), punkt['symbol'] , punkt['grader'], punkt['nedbør'])
    return str

resXCor, resYCor, navn, type = hentKoordinater(Sted)
vaermelding = hentVaer(resXCor, resYCor)
res = formaterTekst(vaermelding, navn, type)
print(res)
