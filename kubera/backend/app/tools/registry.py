TOOLS = {}


def register(name: str):
    def decorator(fn):
        TOOLS[name] = fn
        return fn

    return decorator


# Example tools registered elsewhere:
# from app.tools.crm_tools import *
# from app.tools.invoice_tools import *
