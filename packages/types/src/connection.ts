import { ISequence } from "./sequence";
import { KeyPair } from "./crypto";
import { RelayTypes } from "./relay";
import { SettingTypes } from "./settings";

export declare namespace ConnectionTypes {
  export interface ProposeParams {
    relay: RelayTypes.ProtocolOptions;
  }

  export type CreateParams = ProposeParams;

  export type SignalTypeUri = "uri";

  export type SignalType = SignalTypeUri;

  export interface SignalParamsUri {
    uri: string;
  }

  export type SignalParams = SignalParamsUri;

  export interface BaseSignal {
    type: SignalType;
    params: SignalParams;
  }

  export interface SignalUri extends BaseSignal {
    type: SignalTypeUri;
    params: SignalParamsUri;
  }

  export type Signal = SignalUri;

  export interface Proposal {
    topic: string;
    relay: RelayTypes.ProtocolOptions;
    proposer: Participant;
    signal: Signal;
    setting: SettingTypes.Proposal;
  }

  export type ProposedStatus = "proposed";

  export type RespondedStatus = "responded";

  export type PendingStatus = ProposedStatus | RespondedStatus;

  export interface BasePending {
    status: PendingStatus;
    topic: string;
    relay: RelayTypes.ProtocolOptions;
    keyPair: KeyPair;
    proposal: Proposal;
  }

  export interface ProposedPending extends BasePending {
    status: ProposedStatus;
  }

  export interface RespondedPending extends BasePending {
    status: RespondedStatus;
    outcome: Outcome;
  }

  export type Pending = ProposedPending | RespondedPending;

  export interface RespondParams<S = any> {
    approved: boolean;
    proposal: Proposal;
    state?: S;
    metadata?: Metadata;
  }

  export interface SettleParams {
    relay: RelayTypes.ProtocolOptions;
    peer: Participant;
    keyPair: KeyPair;
    setting: SettingTypes.Settled;
  }

  export interface UpdateParams<S = any> {
    topic: string;
    state?: S;
    metadata?: Metadata;
  }
  export type Update<S = any> = { state: S } | { metadata: Metadata };

  export interface DeleteParams {
    topic: string;
    reason: string;
  }

  export interface Settled {
    topic: string;
    relay: RelayTypes.ProtocolOptions;
    sharedKey: string;
    keyPair: KeyPair;
    peer: Participant;
    setting: SettingTypes.Settled;
  }

  export interface Participant {
    publicKey: string;
    metadata?: Metadata;
  }

  export interface Metadata {
    type: string;
    platform: string;
    version: string;
    os: string;
  }

  export interface Success {
    topic: string;
    relay: RelayTypes.ProtocolOptions;
    setting: SettingTypes.Settled;
    responder: Participant;
  }

  export interface Failed {
    reason: string;
  }

  export type Outcome = Failed | Success;
}

export abstract class IConnection extends ISequence<
  ConnectionTypes.Pending,
  ConnectionTypes.Settled,
  ConnectionTypes.Update,
  ConnectionTypes.CreateParams,
  ConnectionTypes.RespondParams,
  ConnectionTypes.UpdateParams,
  ConnectionTypes.DeleteParams,
  ConnectionTypes.ProposeParams,
  ConnectionTypes.SettleParams
> {}
