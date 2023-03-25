import {describe, it} from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {expect} from 'chai';

import app from '../../src/index';

chai.use(chaiHttp);

describe('league', function() {
  it('should accept a league with all properties informed', function() {
    chai.request(app)
        .post('/league')
        .send({
          name: '2022-23 Premier League',
          teams: [
            'Arsenal',
            'Aston Villa',
            'Bournemouth',
            'Brentford',
            'Brighton & Hove Albion',
            'Chelsea',
            'Crystal Palace',
            'Everton',
            'Fulham',
            'Leeds United',
            'Leicester City',
            'Liverpool',
            'Manchester City',
            'Manchester United',
            'Newcastle United',
            'Nottingham Forest',
            'Southampton',
            'Tottenham Hotspur',
            'West Ham United',
            'Wolverhampton Wanderers',
          ],
        })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
        });
  });
});
