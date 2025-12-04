import json
from typing import Optional

import requests

from ndicve.model import CPE, Vulnerability

API_URL = "https://cvedb.shodan.io"
DEFAULT_COUNT = 1000


def get_cves(page: int = 2) -> list[Vulnerability]:
    params = {"skip": page * DEFAULT_COUNT}
    response = requests.request("GET", API_URL + "/cves", params=params)
    response_data = json.loads(response.text)
    print(response_data)
    for x in response_data["cves"]:
        if x["product"]:
            print(x)
    return [Vulnerability(**x) for x in response_data["cves"] if x["product"]]


def get_cve(cveid: str) -> tuple[Optional[Vulnerability], list[CPE]]:
    response = requests.request("GET", API_URL + "/cve/" + cveid)
    response_data = json.loads(response.text)
    print(response_data)
    if "cpes" in response_data.keys():
        cpes = [
            CPE.from_uri(x)
            for x in response_data.pop("cpes", [])
            if len(CPE.from_uri(x).version) > 1
        ]
        print(cpes)
        return Vulnerability(**response_data), cpes
    else:
        return None, []


if __name__ == "__main__":
    print(get_cves()[0])
