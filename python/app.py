import requests
import json
import datetime
import asyncio
import aiohttp
import ssl 
from pandas import *
data = read_csv("courses.csv")
course_list_new = data['courses'].tolist()
url = "https://us-west-2.aws.data.mongodb-api.com/app/data-xsbfm/endpoint/data/v1/action/find"
payload = {
    "collection": "submissions",
    "database": "canvas",
    "dataSource": "Dedicated-server",
    "filter": {
      "courseId": "345"
    }
}
headers = {
  'Content-Type': 'application/json',
  'Access-Control-Request-Headers': '*',
  'api-key': 'UKx8KivxOtvdWd2qyfJP7AxTGo6ZHI78MXnH04MDm2QzxwIk9Gbzw9Wk1t08OihP',
}
async def closeconnection(session):
    await session.close()
async def fn(session):
    #async with ClientSession(trust_env=True) as session:
    async with session.post(url,headers=headers,json=payload,ssl=False) as response:
        return await response.json()
    #return await fetch(url,session,token,query,variables,client,schoolname)
async def by_aiohttp_concurrency(course_list,session):
    Submissions=list()
    tasks = []
    for course_id in course_list:
        tasks.append(asyncio.create_task(fn(session)))
    original_result = await asyncio.gather(*tasks)
    for res in original_result:
        #print(res.keys())
        Submissions=Submissions+res['documents']
    return Submissions
Start = datetime.datetime.now()
#loop = asyncio.new_event_loop()
#asyncio.set_event_loop(loop)
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

loop = asyncio.get_event_loop()
session=aiohttp.ClientSession()
data=loop.run_until_complete(by_aiohttp_concurrency(course_list_new,session))
#print(data)
asyncio.run(closeconnection(session))
End = datetime.datetime.now()
print("Time Taken",End-Start)
#Start = datetime.datetime.now()
#response = requests.request("POST", url, headers=headers, data=payload)
#End = datetime.datetime.now()
#print("Time Taken:", End-Start)
#print(response.text)