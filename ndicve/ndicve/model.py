from dataclasses import dataclass
from typing import List, Optional


@dataclass
class Vulnerability:
    cve_id: str
    summary: str
    cvss: Optional[float]
    cvss_version: Optional[float]
    cvss_v2: Optional[float]
    cvss_v3: Optional[float]
    epss: Optional[float]
    ranking_epss: Optional[float]
    kev: bool
    propose_action: Optional[str]
    ransomware_campaign: Optional[str]
    references: List[str]
    published_time: str
    vendor: Optional[str] = None
    product: Optional[str] = None
    version: Optional[str] = None


@dataclass
class CPE:
    part: str
    vendor: str
    product: str
    version: str

    @staticmethod
    def from_uri(cpe_uri: str) -> "CPE":
        print(cpe_uri)
        if not cpe_uri.startswith("cpe:2.3:"):
            raise ValueError("Invalid CPE 2.3 string")

        parts = cpe_uri.split(":")

        fields = parts[2:]
        if len(fields) != 4:
            raise ValueError(
                f"Expected 4 fields after 'cpe:2.3:', got {len(fields)}"
            )
        return CPE(*fields)
