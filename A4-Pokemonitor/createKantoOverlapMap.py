output = ""

regions = {}

with open("localePoints.csv") as f:
    line = f.readline()
    while line:
        split = line.split(",")
        if len(split) < 2:
            break

        region_id = int(split[0])
        region_name = split[1]
        svg_obj_type = split[2]

        info = {}
        if svg_obj_type == "r":
            info = {
                "name": region_name,
                "obj_type": svg_obj_type,
                "x0": float(split[3]),
                "y0": float(split[4]),
                "x1": float(split[5]),
                "y1": float(split[6])
            }
        # TODO handle this case properly later
        elif svg_obj_type == "c":
            info = {
                "name": region_name,
                "obj_type": svg_obj_type,
                "x0": float(split[3]) - float(split[5]),
                "y0": float(split[4]) - float(split[5]),
                "x1": float(split[3]) + float(split[5]),
                "y1": float(split[4]) + float(split[5])
            }
        else:
            line = f.readline()
            continue

        regions[region_id] = info
        line = f.readline()

dim = [regions[-1]["x1"], regions[-1]["y1"]]

output += "<svg version=\"1.1\" viewBox=\"0.0 0.0 {} {}\" fill=\"none\" stroke=\"none\" stroke-linecap=\"square\" stroke-miterlimit=\"10\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns=\"http://www.w3.org/2000/svg\">".format(dim[0], dim[1])
output += "<clipPath id=\"p.0\">"
output += "<path d=\"m0 0l{} 0l0 {}l{} 0l0 {}z\" clip-rule=\"nonzero\" />".format(dim[0], dim[1], -dim[0], -dim[1])
output += "</clipPath>"
output += "<g clip-path=\"url(#p.0)\">"

for k in regions.keys():
    info = regions[k]
    output += "<path id=\"overlay{}Box\" fill=\"#ffffff\" fill-opacity=\"0.0\" d=\"m{} {}l{} 0l0 {}l{} 0z\" fill-rule=\"evenodd\" />".format(k, info["x0"], info["y0"], info["x1"] - info["x0"], info["y1"] - info["y0"], info["x0"] - info["x1"])
    if k == -1:
        continue
    output += "<path id=\"overlay{}Line\" opacity=\"0.0\" stroke=\"#0000ff\" stroke-width=\"3.0\" stroke-linejoin=\"round\" stroke-linecap=\"butt\" d=\"m{} {}l{} 0l0 {}l{} 0z\" fill-rule=\"evenodd\" />".format(k, info["x0"], info["y0"], info["x1"] - info["x0"], info["y1"] - info["y0"], info["x0"] - info["x1"])

output += "</g>"
output += "</svg>"

with open("overlay_svg.svg", "w") as f:
    f.write(output)

# Generate JS
jsOut = "var localeCoord = {"
for k in regions.keys():
    info = regions[k]
    if k == -1:
        jsOut += "{}: {} x: {}, y: {} {},".format("dim", "{", info["x1"], info["y1"], "}")
        continue
    info = regions[k]
    jsOut += "{}: {} x0: {}, y0: {}, x1: {}, y1: {} {},".format(str(k), "{", info["x0"], info["y0"], info["x1"], info["y1"], "}")

jsOut += "};"

with open("localeCoordinates.js", "w") as f:
    f.write(jsOut)
