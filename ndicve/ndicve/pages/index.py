from typing import Callable, List

import reflex as rx

import ndicve.code.cve as cve
import ndicve.components.cve as compcve
import ndicve.model as m


class State(rx.State):
    """The app state."""

    cves: List[m.Vulnerability] = cve.get_cves()
    data = cve.get_chart_data()


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


@rx.page(route="/")
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
        min_height="85vh",
        width="100%",
        spacing="5",
        align="center",
        justify="center",
        padding="5%",
    )
