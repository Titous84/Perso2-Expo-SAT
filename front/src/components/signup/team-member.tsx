/**
 * Tristan Lafontaine
 */
import React from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator'
import TeamMember from '../../types/sign-up/team-member';
import { MAX_LENGTH_FIRST_NAME, MAX_LENGTH_LAST_NAME } from '../../utils/constants';
import { Checkbox, FormControl,FormControlLabel,FormLabel, Grid, Paper, Radio, RadioGroup } from '@mui/material';
import styles from "./../../pages/ParticipantRegistration/ParticipantRegistrationPage.module.css";
import { TextValidator } from 'react-material-ui-form-validator'
import { INPUT_VARIANT } from '../../utils/muiConstants';
import { TEXTS } from '../../lang/fr';
import { suffix } from '../../utils/utils';

/**
 *  Composant membre de l'équipe
 */
interface TeamMemberFormProps{
    teamMember:TeamMember;
    number:number;
    handleChangeTeamMember:(number:number,key:string,value:any) => void;
}

export default class TeamMemberForm extends React.Component<TeamMemberFormProps> {
    /**
     * Vérification personnaliser
     */
     componentDidMount() {

        //  Vérfier la longeur du champs nom famille
        ValidatorForm.addValidationRule('maxLenghtLastName', (value) => {
        if (value.length > MAX_LENGTH_LAST_NAME) {
            return false;
        }
            return true;
        });
        //  Vérifier la longeur du champs prénom
        ValidatorForm.addValidationRule('maxLenghtFirstName', (value) => {
            if (value.length > MAX_LENGTH_FIRST_NAME) {
                return false;
            }
            return true;
        });
    }
        
    //Permet d'enlever l'erreur des champs quand il respecte les critères
    componentWillUnmount() {
        // Retir l'erreur pour le champs prénom
        ValidatorForm.removeValidationRule('maxLenghtFirstName');
        // Retir l'erreur pour le champs nom famille
        ValidatorForm.removeValidationRule('maxLenghtLastName');
    }

    render(){
        return (
            <Paper elevation={8} className={`${styles.paddingPaper} ${styles.paddingPaperTop} ${styles.member}`}>
            <Paper
                    className={`${styles.subhead} ${styles.stack}`}
                >
                    <h2>{this.props.number}<sup>{suffix(this.props.number)}</sup> membre</h2>
                </Paper>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextValidator
                                required
                                variant={INPUT_VARIANT}
                                label={TEXTS.signup.firstName.label}
                                name={TEXTS.signup.firstName.label}
                                onChange={(event:any) => this.props.handleChangeTeamMember(this.props.number,"firstName",event.target.value)}
                                value={this.props.teamMember.firstName}
                                validators={['required', 'maxLenghtFirstName']}
                                errorMessages={[TEXTS.signup.firstName.error.required, TEXTS.signup.firstName.error.maximum]}
                                inputProps={{ maxLength: MAX_LENGTH_FIRST_NAME }}
                                fullWidth />
                            <p className={styles.alignRight}>{this.props.teamMember.firstName.length} / {MAX_LENGTH_FIRST_NAME}</p>
                        </Grid>
                        <Grid item xs={12} md={6}>

                            <TextValidator
                                required
                                variant={INPUT_VARIANT}
                                label={TEXTS.signup.lastName.label}
                                name={TEXTS.signup.lastName.label}
                                onChange={(event:any) => this.props.handleChangeTeamMember(this.props.number,"lastName",event.target.value)}
                                value={this.props.teamMember.lastName}
                                validators={['required', 'maxLenghtLastName']}
                                errorMessages={[TEXTS.signup.lastName.error.required, TEXTS.signup.lastName.error.maximum]}
                                inputProps={{ maxLength: MAX_LENGTH_LAST_NAME }}
                                fullWidth />
                            <p className={styles.alignRight}>{this.props.teamMember.lastName.length} / {MAX_LENGTH_LAST_NAME}</p>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextValidator
                                required
                                variant={INPUT_VARIANT}
                                label="Numero DA"
                                onChange={(event:any) => this.props.handleChangeTeamMember(this.props.number, "numero_da",event.target.value)}
                                name="Numero DA"
                                value={this.props.teamMember.numero_da}
                                validators={['required']}
                                errorMessages={['Le numéro de DA est requis']}
                                inputProps={{ maxLength: 255 }}
                                fullWidth />
                            <p className={styles.alignRight}>{this.props.teamMember.numero_da.length} / 255</p>
                        </Grid>
                        <Grid item xs={12} md={12}>
                        <FormControl>
                            {/* Sélection de la clause de consentement photo selon les besoins d'ExpoSAT. */}
                            {/* @author Nathan Reyes */}
                            <FormLabel>{TEXTS.signup.photoConsent.title}</FormLabel>
                            <RadioGroup
                                name={`photo-consent-clause-${this.props.number}`}
                                value={this.props.teamMember.photoConsentClause}
                                onChange={(event:any) => {
                                    const clauseSelectionnee = event.target.value;

                                    // Synchronise l'ancien champ pictureConsent avec la clause choisie.
                                    // @author Nathan Reyes
                                    const consentementPhoto = clauseSelectionnee === "refus_total" ? 0 : 1;
                                    this.props.handleChangeTeamMember(this.props.number, "photoConsentClause", clauseSelectionnee)
                                    this.props.handleChangeTeamMember(this.props.number, "pictureConsent", consentementPhoto)
                                }}
                            >
                                <FormControlLabel value={"publication"} control={<Radio />} label={TEXTS.signup.photoConsent.publication} />
                                <FormControlLabel value={"usage_interne"} control={<Radio />} label={TEXTS.signup.photoConsent.internalUse} />
                                <FormControlLabel value={"refus_total"} control={<Radio />} label={TEXTS.signup.photoConsent.totalRefusal} />
                            </RadioGroup>
                        </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            {/* Option d'inscription anonyme demandée pour les listes. */}
                            {/* @author Nathan Reyes */}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.teamMember.isAnonymous === 1}
                                        onChange={(event:any) => {
                                            this.props.handleChangeTeamMember(this.props.number, "isAnonymous", event.target.checked ? 1 : 0)
                                        }}
                                    />
                                }
                                label={TEXTS.signup.anonymousRegistration.label}
                            />
                        </Grid>

                    </Grid>
                </Paper>
        );
    }
}