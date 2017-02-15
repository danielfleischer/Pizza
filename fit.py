#!/usr/bin/python2

# [ [(x1,y1), (x2,y2)], ...]
def fit(slices):
    return sum(map(lambda s: (abs(s[1][1] - s[0][1]) + 1) * (abs(s[1][0] - s[0][0]) + 1), slices))

if __name__ == '__main__':
    print fit([ [(1,0), (3,4)], [(0, 5), (4, 6)] ])
