from typing import Callable, List

import reflex as rx

import ndicve.code.cve as cve
import ndicve.components.cve as compcve
import ndicve.model as m


class State(rx.State):
    """The app state."""

    page: int = 0
    cves: List[m.Vulnerability] = []
    data = []

    def prev(self):
        if self.page > 0:
            self.page -= 1
            self.reload_data()

    def next(self):
        self.page += 1
        self.reload_data()

    def reload_data(self):
        self.cves: List[m.Vulnerability] = cve.get_cves(self.page)
        self.data = cve.get_chart_data(self.page)


def bar_simple():
    return rx.recharts.bar_chart(
        rx.recharts.bar(
            data_key="nb",
            stroke=rx.color("accent", 9),
            fill=rx.color("accent", 8),
        ),
        rx.recharts.x_axis(data_key="name"),
        rx.recharts.y_axis(),
        rx.recharts.tooltip(),
        data=State.data,
        width="100%",
        height=250,
    )


@rx.page(route="/", on_load=State.reload_data)
def index() -> rx.Component:
    # Welcome Page (Index)
    return rx.vstack(
        rx.heading("CVE Explorer", size="9"),
        bar_simple(),
        rx.vstack(
            rx.flex(
                rx.foreach(
                    State.cves,
                    lambda cve: rx.link(
                        compcve.cve_badge(cve, width="30em", cursor="pointer"),
                        href="/vuln/" + cve.cve_id,
                        style={
                            "color": "inherit",
                            "textDecoration": "none",
                        },
                    ),
                ),
                wrap="wrap",
                direction=rx.breakpoints(initial="column", sm="row"),
                justify="between",
                align="center",
                spacing="4",
            ),
            width="100%",
            spacing="5",
            align="center",
            justify="center",
        ),
        rx.flex(
            rx.button(
                "Previous",
                size="4",
                on_click=State.prev,
                disabled=State.page == 0,
            ),
            rx.badge(rx.text((State.page + 1).to(str), size="5")),
            rx.button("Next", size="4", on_click=State.next),
            justify="between",
            align="center",
            width="50%",
        ),
        min_height="85vh",
        width="100%",
        spacing="5",
        align="center",
        justify="center",
        padding="5%",
    )
