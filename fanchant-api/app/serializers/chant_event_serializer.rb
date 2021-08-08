class ChantEventSerializer < ActiveModel::Serializer
  attributes :id, :scheduled_for, :state, :next_line

  has_one :chant
end
