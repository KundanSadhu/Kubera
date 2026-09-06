from app.modules.invoicing.gst import calc_gst


def test_gst_intra():
    r = calc_gst(1000, 18, True)
    assert r["gst_amount"] == 180
    assert r["cgst"] == 90
    assert r["sgst"] == 90
    assert r["total"] == 1180


def test_gst_inter():
    r = calc_gst(1000, 18, False)
    assert r["igst"] == 180
    assert r["total"] == 1180


def test_gst_5():
    r = calc_gst(100, 5, True)
    assert r["gst_amount"] == 5.0
