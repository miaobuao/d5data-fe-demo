import time
import json

with open("./data/test.json") as f:
    data = json.loads(f.read())
    
unmatched_cnt = 0
cnt = 0
res = []
st = time.time()

for d in data:
    prompt: str = d['input']
    origin_id: int = d['id']
    gold_index: int = d['gold_index']
    class_id: int = d['class_id']
    for line in prompt.split("\n\n"):
        if line.endswith("No"):
            question = line[:-2]
            answer = "No"
        elif line.endswith("Yes"):
            question = line[:-3]
            answer = "Yes"
        else:
            unmatched_cnt += 1
            continue
        res.append({
            "id": cnt,
            "Question": question,
            "Answer": answer,
            "gold_index": gold_index,
            "class_id": class_id,
            "origin_id": origin_id
        })
        cnt += 1

cost_time = time.time() - st
print("cost time:", cost_time)
print("count of pairs:", len(res))
with open("./res.json", 'w+', encoding="utf8") as f:
    json.dump(res, f, ensure_ascii=False, indent=2)
