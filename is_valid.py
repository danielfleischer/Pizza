#!/usr/bin/python2

import numpy as np

# [ [(x1,y1), (x2,y2)], ...]
def is_valid(matrix, slices):
    dirty = np.ones(matrix.shape)
    for s in slices:
        r1, c1 = s[0]
        r2, c2 = s[1]
        if not np.any(dirty[r1:(r2 + 1), c1:(c2 + 1)]):
            return False
        dirty[r1:(r2 + 1), c1:(c2 + 1)] = 0
    return True

if __name__ == '__main__':
    m = np.ones((5, 8))
    valid = [ [(1,0), (3,4)], [(0, 6), (4, 7)] ]
    print is_valid(m, valid)

    valid = [ [(1,0), (3,4)], [(0, 6), (4, 7)], [(1,1), (2,2)] ]
    print is_valid(m, valid)
    
    valid = [ [(0, 0), (4,7)] ]
    print is_valid(m, valid)
