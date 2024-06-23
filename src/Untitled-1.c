def checkExit(m, n, entrance, coords):
    return coords != entrance and (coords[0] == 0 or coords[0] == m or coords[1] == 0 or coords[1] == n):
        