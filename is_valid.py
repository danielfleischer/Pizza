#!/usr/bin/python2

import numpy as np

# [ [(x1,y1), (x2,y2)], ...]
def is_valid(matrix, slices, L, H):
    dirty = np.ones(matrix.shape)
    for s in slices:
        r1, c1 = s[0]
        r2, c2 = s[1]
        if abs(r2 - r1) * abs(c2 - c1) > H:
            return False
        if np.sum(dirty[r1:(r2 + 1), c1:(c2 + 1)]) < L:
            return False
        if not np.any(dirty[r1:(r2 + 1), c1:(c2 + 1)]):
            return False
        dirty[r1:(r2 + 1), c1:(c2 + 1)] = 0
    return True

if __name__ == '__main__':
    m = np.array([[1, -1, -1, -1, 1, 1, 1, ],
            [-1, -1, -1, -1, 1, -1, -1, ],
            [1, 1, -1, 1, 1, -1, 1, ],
            [1, -1, -1, 1, -1, -1, -1, ],
            [1, 1, 1, 1, 1, 1, -1, ],
            [1, 1, 1, 1, 1, 1, -1, ]], dtype=int)
    print m
    
    print "valid slicing"
    slicing = [ [(0,0), (1,1)], [(3, 3), (3, 5)] ]
    print is_valid(m, slicing, 1, 5)

    print "slice too big"
    slicing = [ [(0,0), (4,2)] ]
    print is_valid(m, slicing, 1, 5)
    
    print "not enough of something"
    slicing = [ [(2, 0), (5, 0)] ]
    print is_valid(m, slicing, 1, 5)
