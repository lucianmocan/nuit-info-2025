import json
from collections import defaultdict
from typing import Optional

import requests

from ndicve.model import CPE, Vulnerability

API_URL = "https://cvedb.shodan.io"
DEFAULT_COUNT = 1000


def get_cves(page: int = 0, search: str = "") -> list[Vulnerability]:
    if len(search) > 0:
        # naive search
        results = []
        i = 0
        while i < 8 and len(results) < DEFAULT_COUNT:
            print(i)
            for vul in get_cves(page + i):
                if (
                    vul.product.lower() in search.lower()
                    or search.lower() in vul.product.lower()
                ):
                    results.append(vul)
                elif (
                    vul.vendor.lower() in search.lower()
                    or search.lower() in vul.vendor.lower()
                ):
                    results.append(vul)
            i += 1
        return results
    else:
        params = {"skip": page * DEFAULT_COUNT}
        response = requests.request("GET", API_URL + "/cves", params=params)
        response_data = json.loads(response.text)
        return [
            Vulnerability(**x) for x in response_data["cves"] if x["product"]
        ]


def get_chart_data(vulns: list[Vulnerability], attribute="vendor"):
    groups = defaultdict(int)
    for vuln in vulns:
        groups[getattr(vuln, attribute)] += 1
    if len(groups.keys()) > 0:
        avg = sum(groups.values()) / len(groups.keys())
        return [
            {"name": key, "nb": groups[key]}
            for key in groups.keys()
            if groups[key] > avg / 5
        ]
    else:
        return []


def get_cve(cveid: str) -> tuple[Optional[Vulnerability], list[CPE]]:
    response = requests.request("GET", API_URL + "/cve/" + cveid)
    response_data = json.loads(response.text)
    if "cpes" in response_data.keys():
        cpes = [
            CPE.from_uri(x)
            for x in response_data.pop("cpes", [])
            if len(CPE.from_uri(x).version) > 1
        ]
        return Vulnerability(**response_data), cpes
    else:
        return None, []


if __name__ == "__main__":
    print(get_cves()[0])
