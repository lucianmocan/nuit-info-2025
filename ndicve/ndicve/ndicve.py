"""Welcome to Reflex! This file outlines the steps to create a basic app."""

import reflex as rx

from .pages.index import index, search
from .pages.vuln import vuln

app = rx.App()
