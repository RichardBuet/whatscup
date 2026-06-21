const posiciones = {};

Object.keys(grupos)
.sort()
.forEach(grupo => {

    posiciones[grupo] =
        Object.values(grupos[grupo])
        .sort((a,b) => {

            const dgA =
                a.gf - a.gc;

            const dgB =
                b.gf - b.gc;

            if (b.pts !== a.pts)
                return b.pts - a.pts;

            if (dgB !== dgA)
                return dgB - dgA;

            return b.gf - a.gf;

        });

});
