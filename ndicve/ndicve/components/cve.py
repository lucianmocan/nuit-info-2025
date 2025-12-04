from typing import Optional

import reflex as rx

import ndicve.model as m


def cvss_badge(cvs_score: float) -> rx.Component:
    return rx.badge(
        rx.text(cvs_score, size="5"),
        color_scheme=rx.cond(
            cvs_score >= 4,
            rx.cond(cvs_score >= 7, "tomato", "yellow"),
            "grass",
        ),
    )


def cvetitle(cve: m.Vulnerability) -> rx.Component:
    return rx.flex(
        rx.heading(cve.cve_id, _as="h1"),
        rx.cond(
            cve.cvss_v2,
            rx.hstack(
                rx.text("CVSS v2", size="5"),
                cvss_badge(cve.cvss_v2),
                align="center",
                justify="center",
            ),
        ),
        rx.cond(
            cve.cvss_v3,
            rx.hstack(
                rx.text("CVSS v3", size="5"),
                cvss_badge(cve.cvss_v3),
                align="center",
                justify="center",
            ),
        ),
        align="center",
        justify="between",
        width="100%",
        wrap="wrap",
        spacing="2",
    )


def cvepage(cve: Optional[m.Vulnerability], cpes: list[m.CPE]) -> rx.Component:
    return rx.vstack(
        cvetitle(cve),
        rx.flex(
            rx.cond(
                cpes.length() > 0,
                rx.vstack(
                    rx.heading(
                        "Affected product : "
                        + cpes[0].vendor
                        + " - "
                        + cpes[0].product,
                        _as="h2",
                    ),
                    rx.accordion.root(
                        rx.accordion.item(
                            header="Affected versions ("
                            + cpes.length().to(str)
                            + ")",
                            content=rx.list.unordered(
                                rx.foreach(
                                    cpes,
                                    lambda cpe: rx.list.item(
                                        rx.text(cpe.version)
                                    ),
                                )
                            ),
                        ),
                        collapsible=True,
                        variant="outline",
                    ),
                    width="100%",
                ),
                rx.spacer(),
            ),
            rx.vstack(
                rx.heading("Summary:", _as="h2"),
                rx.text(cve.summary),
                rx.heading("References:", _as="h2"),
                rx.list.unordered(
                    rx.foreach(
                        cve.references,
                        lambda ref: rx.list.item(rx.link(ref, href=ref)),
                    )
                ),
                width="100%",
            ),
            spacing="9",
            wrap=rx.breakpoints(initial="wrap", md="nowrap"),
            direction="row",
        ),
    )


def cve_badge(cve: m.Vulnerability, **props) -> rx.Component:
    return rx.card(
        rx.vstack(cvetitle(cve), rx.heading(cve.vendor + " - " + cve.product)),
        **props,
    )
