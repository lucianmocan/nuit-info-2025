import reflex as rx


class State(rx.State):
    query: str = ""

    def search(self, event):
        if event == "Enter":
            return self.actually_search()

    def actually_search(self):
        if self.query.startswith("CVE-"):
            return rx.redirect("/vuln/" + self.query)
        else:
            return rx.redirect("/search/" + self.query)

    def set_query(self, msg: str):
        self.query = msg


def navbar_searchbar() -> rx.Component:
    return rx.box(
        rx.desktop_only(
            rx.hstack(
                rx.hstack(
                    rx.link(
                        rx.heading("CVE Explorer", size="7", weight="bold"),
                        href="/",
                        style={
                            "color": "inherit",
                            "textDecoration": "none",
                        },
                    ),
                    align_items="center",
                ),
                rx.input(
                    rx.input.slot(
                        rx.icon(
                            "search",
                            on_click=State.actually_search,
                            cursor="pointer",
                        )
                    ),
                    placeholder="Search...",
                    type="search",
                    size="2",
                    justify="end",
                    on_change=State.set_query,
                    on_key_down=State.search,
                ),
                justify="between",
                align_items="center",
            ),
        ),
        rx.mobile_and_tablet(
            rx.hstack(
                rx.hstack(
                    rx.link(
                        rx.heading("CVE Explorer", size="6", weight="bold"),
                        href="/",
                        style={
                            "color": "inherit",
                            "textDecoration": "none",
                        },
                    ),
                    align_items="center",
                ),
                rx.input(
                    rx.input.slot(
                        rx.icon(
                            "search",
                            on_click=State.actually_search,
                            cursor="pointer",
                        )
                    ),
                    placeholder="Search...",
                    type="search",
                    size="2",
                    justify="end",
                    on_change=State.set_query,
                    on_key_down=State.search,
                ),
                justify="between",
                align_items="center",
            ),
        ),
        bg=rx.color("accent", 3),
        padding="1em",
        # position="fixed",
        # top="0px",
        # z_index="5",
        width="100%",
    )
