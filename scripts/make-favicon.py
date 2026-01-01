from pathlib import Path


def main() -> None:
    png_path = Path("public/logo/icon.png")
    ico_path = Path("app/favicon.ico")

    if not png_path.exists():
        raise SystemExit(f"Missing source icon: {png_path}")

    png_data = png_path.read_bytes()
    header = (0).to_bytes(2, "little") + (1).to_bytes(2, "little") + (1).to_bytes(2, "little")
    width = 0  # 0 means 256px in ICO
    height = 0
    color_count = 0
    reserved = 0
    planes = 1
    bit_count = 32
    bytes_in_res = len(png_data)
    image_offset = 6 + 16
    entry = (
        bytes([width, height, color_count, reserved])
        + planes.to_bytes(2, "little")
        + bit_count.to_bytes(2, "little")
        + bytes_in_res.to_bytes(4, "little")
        + image_offset.to_bytes(4, "little")
    )

    ico_path.write_bytes(header + entry + png_data)
    print(f"wrote {ico_path}")


if __name__ == "__main__":
    main()
