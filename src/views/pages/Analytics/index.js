import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { ArrowDown, Download, Smartphone, User, Users } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import StatisticsCards from '../../../components/@vuexy/StatisticsCard';
import CardComponent from '../../../components/hoc/cardComponent';
import { history } from '../../../history';
import { viewNotification } from '../../../redux/actions/admin';

const Analytics = () => {
    return (
        <React.Fragment>

            <Card>
                <CardHeader style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <CardTitle>Analytics</CardTitle>
                    <Button color="primary" onClick={() => { history.push('/') }}>Download Report</Button>
                </CardHeader>
                <CardBody>

                </CardBody>
            </Card>
            <Row className="match-height">
                <Col sm="4">
                    <StatisticsCards
                        icon={<Users className="primary" size={22} />}
                        stat="5000"
                        statTitle="Total Users"
                    />
                </Col>
                <Col sm="4">
                    <StatisticsCards
                        icon={<Smartphone className="primary" size={22} />}
                        stat="4500"
                        statTitle="Device ids found"
                    />
                </Col>
                <Col sm="4">
                    <StatisticsCards
                        icon={<ArrowDown className="primary" size={22} />}
                        stat="3000"
                        statTitle="Notification read count"
                    />
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default CardComponent(Analytics, false);