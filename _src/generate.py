import json
import os
import time
from jinja2 import Template

with open( "gallery_content_eg.html", "r" ) as templateFile:
  template = Template( templateFile.read() )

content = ""

submittedfns = os.listdir("submitted")

slist = []

for submittedfn in submittedfns:
  with open("submitted/" + submittedfn, "r") as f:
    sdict = json.loads(f.read())

    slist.append(sdict)


nslist = sorted(slist, key=lambda k: k['time'])

for sdict in nslist:
  sid = sdict["_id"]
  stime_epoch = sdict["time"]
  stime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(stime_epoch // 1000))
  stitle = sdict["title"]

  srender = template.render(blurb=stitle, submitted_time=stime, submitted_id=sid)
  content += srender


with open( "gallery_template.html", "r" ) as templateFile:
  template = Template( templateFile.read() )

final = template.render(content=content)
print(final)


  
