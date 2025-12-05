from typing import Optional

import reflex as rx

import ndicve.code.cve as cve
import ndicve.model as m
from ndicve.components.cve import cvepage
from ndicve.components.navbar import navbar_searchbar


class State(rx.State):
    """The app state."""

    cve: Optional[m.Vulnerability]
    cpes: list[m.CPE]

    def load(self):
        self.cve, self.cpes = cve.get_cve(self.cveid)


@rx.page(route="/vuln/[cveid]", on_load=State.load)
def vuln() -> rx.Component:
    # Welcome Page (Index)
    return rx.vstack(
        navbar_searchbar(),
        rx.center(
        rx.container(
            cvepage(State.cve, State.cpes)
        ), width="100%"),
        width="100%"
    )
