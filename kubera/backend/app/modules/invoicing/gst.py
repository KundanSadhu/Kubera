from app.core.limits import GST_RATES


def calc_gst(amount: float, gst_rate: int, intra_state: bool = True) -> dict:
    if gst_rate not in GST_RATES:
        raise ValueError(f"Invalid GST rate {gst_rate}, allowed {GST_RATES}")
    gst_amount = round(amount * gst_rate / 100, 2)
    if intra_state:
        cgst = round(gst_amount / 2, 2)
        sgst = round(gst_amount - cgst, 2)  # handle rounding
        return {"cgst": cgst, "sgst": sgst, "igst": 0, "gst_amount": gst_amount, "total": round(amount + gst_amount, 2)}
    else:
        return {"cgst": 0, "sgst": 0, "igst": gst_amount, "gst_amount": gst_amount, "total": round(amount + gst_amount, 2)}


def calc_invoice_totals(items: list[dict], intra_state: bool = True) -> dict:
    amount = sum(i["quantity"] * i["rate"] for i in items)
    gst = sum(calc_gst(i["quantity"] * i["rate"], i["gst_rate"], intra_state)["gst_amount"] for i in items)
    return {"amount": round(amount, 2), "gst_amount": round(gst, 2), "total": round(amount + gst, 2)}
