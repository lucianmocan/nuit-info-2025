from typing import Optional

import reflex as rx

import ndicve.code.cve as cve
import ndicve.model as m
from ndicve.components.cve import cvepage


class State(rx.State):
    """The app state."""

    cve: Optional[m.Vulnerability]
    cpes: list[m.CPE]

    def load(self):
        self.cve, self.cpes = cve.get_cve(self.cveid)


@rx.page(route="/vuln/[cveid]", on_load=State.load)
def vuln() -> rx.Component:
    # Welcome Page (Index)
    return rx.container(
        rx.vstack(
            cvepage(State.cve, State.cpes)
        ),
    )
